import { serialize } from 'class-transformer'
import { Response } from 'express'

/**
 * HTTP status codes enum.
 *
 * @enum
 */
export enum HTTP_STATUS_CODE {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  TEMPORARY_REDIRECT = 307,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  REQUEST_ENTITY_TOO_LARGE = 413,
  REQUEST_URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505
}

export class BaseApiResponse {
  /**
   * The response status code.
   *
   * @private
   */
  protected status: HTTP_STATUS_CODE = HTTP_STATUS_CODE.OK

  /**
   * Api response type.
   *
   * @private
   */
  protected type!: string

  /**
   * Constructor.
   *
   * @param response
   */
  public constructor (
    private readonly _response: Response
  ) { }

  /**
   * Response status code.
   *
   * @param statusCode
   * @public
   */
  public withStatus (statusCode: HTTP_STATUS_CODE = HTTP_STATUS_CODE.OK): this {
    this.status = statusCode
    return this
  }

  /**
   * Response status type.
   *
   * @param type
   * @public
   */
  public withType (type: string): this {
    this.type = type
    return this
  }

  /**
   * Builds the response.
   *
   * @public
   */
  public build (): Response {
    return this._response
      .status(this.status)
      .type('json')
      .send(serialize(this as BaseApiResponse,
        { enableCircularCheck: true, excludePrefixes: ['_'] }))
  }
}
