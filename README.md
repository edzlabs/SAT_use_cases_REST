# SAT_use_cases_REST
#
 Personal Digital Spaces LLC ("COMPANY") CONFIDENTIAL
 
 Unpublished Copyright (c) 2021 Personal Digital Spaces LLC, All Rights Reserved.
 
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
## Overview
This repository contains sample Javascript code to help illustrate how to use the Serialized Asset Token (SAT) technology from Personal Digital Spaces (PDS) to create a new user identity on the blockchain and then transfer pre-minted SATs to that user. Please note that these code examples are for illustrative purposes only. 

The file scenario_sat_rest.js is the starting point and contains the overview of the scenario that is being used for the example. This scenario involves the following steps: create buyer, provide funding to him, sell SAT to him, access the SAT.

The require components for this scenario are as follow:

SELLER - credentials found in config.json

FUNCTIONS:
* createUser    ./samples_rest/CreatingUser_sample
* sendMoney     ./samples_rest/SendingMoney_sample
* listSats      ./samples_rest/ListOwnedSATs_sample
* getSats       ./samples_rest/GetSatMetadata_sample
* sellOwnership ./samples_rest/SellOwnership_sample
* getTicket     ./samples_rest/GetViewingTicket_sample
* downloadFile  ./samples_rest/DownloadFile_sample

## Notes:
* The blockchain ID and credentials in the config.json are for illustrative purposes only. Please insert your own data in this file (to replace the sample data) in order to enable the sample code to work.
* Please reference the PDS Documentation Library found at https://docs.dase.io for more detailed information.
