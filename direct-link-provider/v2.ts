/**
 * (C) Copyright IBM Corp. 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 */

class DirectLinkProviderV2 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://directlink.cloud.ibm.com/provider/v2';
  static DEFAULT_SERVICE_NAME: string = 'direct_link_provider';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of DirectLinkProviderV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {DirectLinkProviderV2}
   */

  public static newInstance(options: UserOptions): DirectLinkProviderV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new DirectLinkProviderV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Requests the version of the API as a date in the format `YYYY-MM-DD`. Any date from 2020-04-28 up to the
   *  current date may be provided. Specify the current date to request the latest version.
   */
  version: string;

  /**
   * Construct a DirectLinkProviderV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - Requests the version of the API as a date in the format `YYYY-MM-DD`. Any date
   * from 2020-04-28 up to the current date may be provided. Specify the current date to request the latest version.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/provider/v2'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {DirectLinkProviderV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const requiredParams = ['version'];
    const missingParams = getMissingParams(options, requiredParams);
    if (missingParams) {
      throw missingParams;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(DirectLinkProviderV2.DEFAULT_SERVICE_URL);
    }
    this.version = options.version;
  }

  /*************************
   * providerAPIs
   ************************/

  /**
   * List gateways.
   *
   * List all Direct Link Connect gateways created by this provider.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining which resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderGatewayCollection>>}
   */
  public listProviderGateways(params?: DirectLinkProviderV2.ListProviderGatewaysParams): Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderGatewayCollection>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const query = {
        'version': this.version,
        'start': _params.start,
        'limit': _params.limit
      };

      const sdkHeaders = getSdkHeaders(DirectLinkProviderV2.DEFAULT_SERVICE_NAME, 'v2', 'listProviderGateways');

      const parameters = {
        options: {
          url: '/gateways',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Create gateway.
   *
   * Create a Direct Link Connect gateway based on the supplied template in the specified customer account.
   *
   * The gateway will be 'provider_api_managed=true'.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {number} params.bgpAsn - BGP ASN.
   *
   * For a 2-byte range, enter a value between 1-64495 or 64999. For a 2-byte or 4-byte range, enter a value between
   * 131072-4199999999. For a 4-byte range, enter a value between 4201000000-4201064511.
   * @param {string} params.customerAccountId - Customer IBM Cloud account ID for the new gateway.  A gateway object
   * containing the pending create request will become available in the specified account.
   * @param {string} params.name - The unique user-defined name for this gateway.
   * @param {ProviderGatewayPortIdentity} params.port - Select Port Label for the gateway.
   * @param {number} params.speedMbps - Gateway speed in megabits per second.
   * @param {string} [params.bgpCerCidr] - BGP customer edge router CIDR.
   *
   * For auto IP assignment, omit bgp_cer_cidr and bgp_ibm_cidr.  IBM will automatically select values for bgp_cer_cidr
   * and bgp_ibm_cidr.
   *
   * For manual IP assignment set a valid bgp_cer_cidr and bgp_ibm_cidr CIDR, the value must reside in one of
   * "10.254.0.0/16", "172.16.0.0/12", "192.168.0.0/16", "169.254.0.0/16" or an owned public CIDR.  bgp_cer_cidr and
   * bgp_ibm_cidr must have matching network and subnet mask values.
   * @param {string} [params.bgpIbmCidr] - BGP IBM CIDR.
   *
   * For auto IP assignment, omit bgp_cer_cidr and bgp_ibm_cidr.  IBM will automatically select values for bgp_cer_cidr
   * and bgp_ibm_cidr.
   *
   * For manual IP assignment set a valid bgp_cer_cidr and bgp_ibm_cidr CIDR, the value must reside in one of
   * "10.254.0.0/16", "172.16.0.0/12", "192.168.0.0/16", "169.254.0.0/16" or an owned public CIDR.  bgp_cer_cidr and
   * bgp_ibm_cidr must have matching network and subnet mask values.
   * @param {string} [params.checkOnly] - When true, perform request validation only and do not create a gateway.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderGateway>>}
   */
  public createProviderGateway(params: DirectLinkProviderV2.CreateProviderGatewayParams): Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderGateway>> {
    const _params = extend({}, params);
    const requiredParams = ['bgpAsn', 'customerAccountId', 'name', 'port', 'speedMbps'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const body = {
        'bgp_asn': _params.bgpAsn,
        'customer_account_id': _params.customerAccountId,
        'name': _params.name,
        'port': _params.port,
        'speed_mbps': _params.speedMbps,
        'bgp_cer_cidr': _params.bgpCerCidr,
        'bgp_ibm_cidr': _params.bgpIbmCidr
      };

      const query = {
        'version': this.version,
        'check_only': _params.checkOnly
      };

      const sdkHeaders = getSdkHeaders(DirectLinkProviderV2.DEFAULT_SERVICE_NAME, 'v2', 'createProviderGateway');

      const parameters = {
        options: {
          url: '/gateways',
          method: 'POST',
          body,
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Delete gateway.
   *
   * Delete a Direct Link Connect provider managed gateway.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Direct Link Connect gateway identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderGateway>>}
   */
  public deleteProviderGateway(params: DirectLinkProviderV2.DeleteProviderGatewayParams): Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderGateway>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const query = {
        'version': this.version
      };

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(DirectLinkProviderV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteProviderGateway');

      const parameters = {
        options: {
          url: '/gateways/{id}',
          method: 'DELETE',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Get gateway.
   *
   * Get a Direct Link Connect gateway.
   *      Gateways with either `provider_api_managed=true` or `provider_api_managed=false` can be retrieved.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Direct Link Connect gateway identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderGateway>>}
   */
  public getProviderGateway(params: DirectLinkProviderV2.GetProviderGatewayParams): Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderGateway>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const query = {
        'version': this.version
      };

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(DirectLinkProviderV2.DEFAULT_SERVICE_NAME, 'v2', 'getProviderGateway');

      const parameters = {
        options: {
          url: '/gateways/{id}',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Update gateway.
   *
   * Update a Direct Link Connect provider managed gateway.
   *
   * Name changes are applied immediately, other changes result in a gateway change_request and require approval from
   * the client.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Direct Link Connect gateway identifier.
   * @param {string} [params.name] - The unique user-defined name for this gateway.
   * @param {number} [params.speedMbps] - Gateway speed in megabits per second.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderGateway>>}
   */
  public updateProviderGateway(params: DirectLinkProviderV2.UpdateProviderGatewayParams): Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderGateway>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const body = {
        'name': _params.name,
        'speed_mbps': _params.speedMbps
      };

      const query = {
        'version': this.version
      };

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(DirectLinkProviderV2.DEFAULT_SERVICE_NAME, 'v2', 'updateProviderGateway');

      const parameters = {
        options: {
          url: '/gateways/{id}',
          method: 'PATCH',
          body,
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * List ports.
   *
   * List all provider ports (associated with the caller).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - A server-supplied token determining which resource to start the page on.
   * @param {number} [params.limit] - The number of resources to return on a page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderPortCollection>>}
   */
  public listProviderPorts(params?: DirectLinkProviderV2.ListProviderPortsParams): Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderPortCollection>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const query = {
        'version': this.version,
        'start': _params.start,
        'limit': _params.limit
      };

      const sdkHeaders = getSdkHeaders(DirectLinkProviderV2.DEFAULT_SERVICE_NAME, 'v2', 'listProviderPorts');

      const parameters = {
        options: {
          url: '/ports',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * Get port.
   *
   * Get provider port information.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - port identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderPort>>}
   */
  public getProviderPort(params: DirectLinkProviderV2.GetProviderPortParams): Promise<DirectLinkProviderV2.Response<DirectLinkProviderV2.ProviderPort>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const query = {
        'version': this.version
      };

      const path = {
        'id': _params.id
      };

      const sdkHeaders = getSdkHeaders(DirectLinkProviderV2.DEFAULT_SERVICE_NAME, 'v2', 'getProviderPort');

      const parameters = {
        options: {
          url: '/ports/{id}',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

}

/*************************
 * interfaces
 ************************/

namespace DirectLinkProviderV2 {

  /** Options for the `DirectLinkProviderV2` constructor. */
  export interface Options extends UserOptions {

    /** Requests the version of the API as a date in the format `YYYY-MM-DD`. Any date from 2020-04-28 up to the
     *  current date may be provided. Specify the current date to request the latest version.
     */
    version: string;
  }

  /** An operation response. */
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listProviderGateways` operation. */
  export interface ListProviderGatewaysParams {
    /** A server-supplied token determining which resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createProviderGateway` operation. */
  export interface CreateProviderGatewayParams {
    /** BGP ASN.
     *
     *  For a 2-byte range, enter a value between 1-64495 or 64999. For a 2-byte or 4-byte range, enter a value between
     *  131072-4199999999. For a 4-byte range, enter a value between 4201000000-4201064511.
     */
    bgpAsn: number;
    /** Customer IBM Cloud account ID for the new gateway.  A gateway object containing the pending create request
     *  will become available in the specified account.
     */
    customerAccountId: string;
    /** The unique user-defined name for this gateway. */
    name: string;
    /** Select Port Label for the gateway. */
    port: ProviderGatewayPortIdentity;
    /** Gateway speed in megabits per second. */
    speedMbps: number;
    /** BGP customer edge router CIDR.
     *
     *  For auto IP assignment, omit bgp_cer_cidr and bgp_ibm_cidr.  IBM will automatically select values for
     *  bgp_cer_cidr and bgp_ibm_cidr.
     *
     *  For manual IP assignment set a valid bgp_cer_cidr and bgp_ibm_cidr CIDR, the value must reside in one of
     *  "10.254.0.0/16", "172.16.0.0/12", "192.168.0.0/16", "169.254.0.0/16" or an owned public CIDR.  bgp_cer_cidr and
     *  bgp_ibm_cidr must have matching network and subnet mask values.
     */
    bgpCerCidr?: string;
    /** BGP IBM CIDR.
     *
     *  For auto IP assignment, omit bgp_cer_cidr and bgp_ibm_cidr.  IBM will automatically select values for
     *  bgp_cer_cidr and bgp_ibm_cidr.
     *
     *  For manual IP assignment set a valid bgp_cer_cidr and bgp_ibm_cidr CIDR, the value must reside in one of
     *  "10.254.0.0/16", "172.16.0.0/12", "192.168.0.0/16", "169.254.0.0/16" or an owned public CIDR.  bgp_cer_cidr and
     *  bgp_ibm_cidr must have matching network and subnet mask values.
     */
    bgpIbmCidr?: string;
    /** When true, perform request validation only and do not create a gateway. */
    checkOnly?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProviderGateway` operation. */
  export interface DeleteProviderGatewayParams {
    /** Direct Link Connect gateway identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProviderGateway` operation. */
  export interface GetProviderGatewayParams {
    /** Direct Link Connect gateway identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateProviderGateway` operation. */
  export interface UpdateProviderGatewayParams {
    /** Direct Link Connect gateway identifier. */
    id: string;
    /** The unique user-defined name for this gateway. */
    name?: string;
    /** Gateway speed in megabits per second. */
    speedMbps?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProviderPorts` operation. */
  export interface ListProviderPortsParams {
    /** A server-supplied token determining which resource to start the page on. */
    start?: string;
    /** The number of resources to return on a page. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProviderPort` operation. */
  export interface GetProviderPortParams {
    /** port identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** gateway. */
  export interface ProviderGateway {
    /** BGP ASN.
     *
     *  For a 2-byte ASN values between 1-64495 or 64999. For a 2-byte or 4-byte range ASN values between
     *  131072-4199999999. For a 4-byte ASN values 4201000000-4201064511.
     */
    bgp_asn: number;
    /** BGP customer edge router CIDR. */
    bgp_cer_cidr?: string;
    /** IBM BGP ASN. */
    bgp_ibm_asn: number;
    /** BGP IBM CIDR. */
    bgp_ibm_cidr?: string;
    /** Gateway BGP status.
     *
     *  The list of enumerated values for this property may expand in the future. Code and processes using this field
     *  must tolerate unexpected values.
     */
    bgp_status?: string;
    change_request?: ProviderGatewayChangeRequest;
    /** The date and time resource was created. */
    created_at: string;
    /** The CRN (Cloud Resource Name) of this gateway. */
    crn?: string;
    /** Customer IBM Cloud account ID. */
    customer_account_id: string;
    /** The unique identifier of this gateway. */
    id: string;
    /** The unique user-defined name for this gateway. */
    name: string;
    /** Gateway operational status.
     *
     *  The list of enumerated values for this property may expand in the future. Code and processes using this field
     *  must tolerate unexpected values.
     */
    operational_status: string;
    /** Port identifier for the gateway. */
    port: ProviderGatewayPortReference;
    /** Set to `true` for gateways created through the Direct Link Provider APIs.
     *
     *  Most Direct Link Provider APIs cannot interact with `provider_api_managed=false` gateways.
     */
    provider_api_managed: boolean;
    /** Gateway speed in megabits per second. */
    speed_mbps: number;
    /** Gateway type. */
    type: string;
    /** VLAN allocated for this gateway. */
    vlan?: number;
  }

  /** ProviderGatewayChangeRequest. */
  export interface ProviderGatewayChangeRequest {
  }

  /** A paginated collection of resources. */
  export interface ProviderGatewayCollection {
    /** A reference to the first page of resources. */
    first: ProviderGatewayCollectionFirst;
    /** The maximum number of resources can be returned by the request. */
    limit: number;
    /** A reference to the next page of resources; this reference is included for all pages except the last page. */
    next?: ProviderGatewayCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
    /** Collection of Direct Link gateways. */
    gateways: ProviderGateway[];
  }

  /** A reference to the first page of resources. */
  export interface ProviderGatewayCollectionFirst {
    /** The URL for the first page of resources. */
    href: string;
  }

  /** A reference to the next page of resources; this reference is included for all pages except the last page. */
  export interface ProviderGatewayCollectionNext {
    /** The URL for the next page of resources. */
    href: string;
    /** start token for the next page of resources. */
    start: string;
  }

  /** Select Port Label for the gateway. */
  export interface ProviderGatewayPortIdentity {
    /** Port identifier. */
    id: string;
  }

  /** Port identifier for the gateway. */
  export interface ProviderGatewayPortReference {
    /** Port identifier. */
    id: string;
  }

  /** Provider port details. */
  export interface ProviderPort {
    /** Port identifier. */
    id: string;
    /** Port Label. */
    label: string;
    /** Port location long name. */
    location_display_name: string;
    /** Port location name identifier. */
    location_name: string;
    /** Port provider name. */
    provider_name: string;
    /** Port's supported speeds in megabits per second. */
    supported_link_speeds: number[];
  }

  /** List of port label details. */
  export interface ProviderPortCollection {
    /** A reference to the first page of resources. */
    first: ProviderPortCollectionFirst;
    /** The maximum number of resources can be returned by the request. */
    limit: number;
    /** A reference to the next page of resources; this reference is included for all pages except the last page. */
    next?: ProviderPortCollectionNext;
    /** The total number of resources across all pages. */
    total_count: number;
    /** Array of ports. */
    ports?: ProviderPort[];
  }

  /** A reference to the first page of resources. */
  export interface ProviderPortCollectionFirst {
    /** The URL for the first page of resources. */
    href: string;
  }

  /** A reference to the next page of resources; this reference is included for all pages except the last page. */
  export interface ProviderPortCollectionNext {
    /** URL for the next page of resources. */
    href: string;
    /** start token for the next page of resources. */
    start: string;
  }

  /** gateway create. */
  export interface ProviderGatewayChangeRequestProviderGatewayCreate extends ProviderGatewayChangeRequest {
    /** type of gateway change request. */
    type: string;
  }

  /** gateway delete. */
  export interface ProviderGatewayChangeRequestProviderGatewayDelete extends ProviderGatewayChangeRequest {
    /** type of gateway change request. */
    type: string;
  }

  /** gateway attributes update. */
  export interface ProviderGatewayChangeRequestProviderGatewayUpdateAttributes extends ProviderGatewayChangeRequest {
    /** type of gateway change request. */
    type: string;
    /** array of pending updates. */
    updates: JsonObject[];
  }

}

export = DirectLinkProviderV2;
