import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { search } from './controller'
import { schema } from './model'
export Records, { schema } from './model'

const router = new Router()

/**
 * @api {post} /records Search records
 * @apiName SearchRecords
 * @apiGroup Records
 * *@apiParamExample {json} Request-Example:
 *  {
 *    "startDate": "2016-01-26",
 *    "endDate": "2018-02-20",
 *    "minCount": 2700,
 *    "maxCount": 3000
 *  }
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404
 *       "msg": "Search cannot be performed"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "code": 0,
 *        "msg": "Success",
 *        "records": [
 *            {
 *                  "key": "bxoQiSKL",
 *                  "createdAt": "2016-01-29T01:59:53.494Z",
 *                  "totalCount": 2991
 *            },
 *            {
 *                  "key": "NOdGNUDn",
 *                  "createdAt": "2016-01-28T07:10:33.558Z",
 *                  "totalCount": 2813
 *             }
 *        ]
 *      }
 *
 * @FormParam startDate date in a “YYYY-MM-DD” format used to filter the data.
 * @apiParam startDate date in a “YYYY-MM-DD” format used to filter the data.
 * @apiParam endDate date in a “YYYY-MM-DD” format used to filter the data.
 * @apiParam minCount Records's minimum counts used for filtering the data. Sum of the “count” array in the documents should be between “minCount” and “maxCount”
 * @apiParam maxCount Records's maximum count counts used for filtering the data. Sum of the “count” array in the documents should be between “minCount” and “maxCount”
 * @apiSuccess {Object} records Records's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Records not found.
 */
router.post('/',
  body({
    startDate: {
      type: String,
      required: true,
    },
    endDate:{
      type: String,
      required: true,
    },
    minCount: {
      type: Number,
      required: true,
    },
    maxCount: {
      type: Number,
      required: true,
    } }),
  search)


export default router
