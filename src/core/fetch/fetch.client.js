/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
//Make simple http request and get back data
//https://www.npmjs.com/package/whatwg-fetch
import 'whatwg-fetch';

export default self.fetch.bind(self);
// import _ from 'fetch/Headers'
// import _ from 'fetch/Request'
// import _ from 'fetch/Respones'
export const Headers = self.Headers;
export const Request = self.Request;
export const Response = self.Response;
