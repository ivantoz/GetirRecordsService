import { success } from '../../services/response/'
import { Records } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Records.create(body)
    .then((records) => records.view(true))
    .then(success(res, 201))
    .catch(next)

export const search = ({ bodymen: { body: { startDate, endDate, minCount, maxCount } } }, res, next) =>
  Records.aggregate([
    {
      // Filter by dates.
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }
    },
    {
      // Flatten counts arrays
      $unwind: {
        path: '$counts'
      }
    },
    {
      // Group by key and createdAt
      $group: {
        _id: { key: '$key', createdAt: '$createdAt' },
        key: { $first: '$key' },
        createdAt: { $first: '$createdAt' },
        totalCount: {
          $sum: '$counts'
        }
      }
    },
    {
      // Filter by minCount and maxCount
      $match: {
        totalCount: {
          $gte: minCount,
          $lte: maxCount
        }
      }
    },
    { $sort: { createdAt: -1 } },
    {
      // Exclude _id in resultset
      $project: {
        _id: 0
      }
    }
  ]).exec()
    .then((records) => records)
    .then(success(res))
    .catch(next)
