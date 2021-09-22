/*
*
* Personal Digital Spaces LLC ("COMPANY") CONFIDENTIAL
* Unpublished Copyright (c) 2021 Personal Digital Spaces LLC, All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains the property of COMPANY. The intellectual and technical concepts contained
* herein are proprietary to COMPANY and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
* from COMPANY.  Access to the source code contained herein is hereby forbidden to anyone except current COMPANY employees, managers, contractors or partners who have executed 
* Confidentiality and Non-disclosure agreements explicitly covering such access.
*
* The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source code, which includes  
* information that is confidential and/or proprietary, and is a trade secret, of  COMPANY.   ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE, 
* OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE 
* LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS  
* TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
*
* ListOwnedSATs_sample.js
*                
* Created by tron on 20/09/2021.
*/

const debug = require("debug")("list_sats");
const cst = require("dsd-common-lib").Constants;

const api = require("./api");

module.exports = async (userId, pos, size) => {
    const tradeType = cst.tradeTypes.TradeBuy.name.toUpperCase();
    const dabType = cst.dabTypes.DabTag.name.toUpperCase();
    const licenseType = cst.licenseTypes.LicenseOwnership.name.toUpperCase();

    //1. get tags I own.
    const deals = await api.get(
        `/deals?userId=${userId}&tradeType=${tradeType}&dabType=${dabType}&licenseType=${licenseType}`
    );
    debug("total count of owned tags: %s", deals.totalCount);

    const totalIds = [];
    const limit = 50;

    for (let offset = 0; offset < deals.totalCount; offset += limit) {
        const iterDeals = await api.get(
            `/deals?userId=${userId}&tradeType=${tradeType}&dabType=${dabType}&licenseType=${licenseType}&offset=${offset}&limit=${limit}`
        );
        debug("getTradedDabsIds[%s]=>[%o,...]", offset, iterDeals.deals[0]);

        totalIds = [...totalIds, ...(iterDeals.deals.map(d => { return d.tagId }))];
    }

    debug("totalIds:%o", totalIds);

    //2. filter SATs from the tags
    const sats = [];
    let pos_i = 0;
    for (let i = 0; i < totalIds.length; i++) {
        const satId = totalIds[i];
        if (sats.length >= size)
            break;

        const dabIds = await api.get(`/sats?queryOption=list&satId=${satId}`);

        if (i % 10 == 0) {
            debug("sat %s -> dabs %o", satId, dabIds);
        }

        if (dabIds.length > 0) {
            pos_i++;

            if (pos_i >= pos) {
                sats.push({ satId, dabIds });
            }
        }
    }

    debug("filtered sats: %o", sats);
    return sats;
};
