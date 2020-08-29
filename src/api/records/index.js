import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { search } from './controller'
export Records, { schema } from './model'

const router = new Router()

/**
 * @api {post} /records Search records
 * @apiName Search Records
 * @apiGroup Records
 * *@apiParamExample {json} Request-Payload:
 *  {
 *    "startDate": "2016-01-26",
 *    "endDate": "2018-02-20",
 *    "minCount": 2700,
 *    "maxCount": 3000
 *  }
 *  @apiErrorExample {json} Error-Response-Payload:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404
 *       "msg": "Search cannot be performed"
 *     }
 * @apiSuccessExample {json} Success-Response-Payload:
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
 * @apiParam {String} startDate date in a “YYYY-MM-DD” format used to filter the data.
 * @apiParam {String} endDate date in a “YYYY-MM-DD” format used to filter the data.
 * @apiParam {Number} minCount Records's minimum counts used for filtering the data. Sum of the “count” array in the documents should be between “minCount” and “maxCount”.
 * @apiParam {Number} maxCount Records's maximum count counts used for filtering the data. Sum of the “count” array in the documents should be between “minCount” and “maxCount”.
 * @apiSuccess {Number} code status of the request. 0 means success. Other values may be used for errors that you define.
 * @apiSuccess {String} msg  description of the code. You can set it to “success” for successful requests.
 * @apiSuccess {Object[]} records  filtered items according to the request. This array should include items of “key”, “createdAt” and “totalCount” which is the sum of the “counts” array in the document.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Records not found.
 */
router.post('/',
  body({
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    minCount: {
      type: Number,
      required: true
    },
    maxCount: {
      type: Number,
      required: true
    }
  }),
  search)

export default router
