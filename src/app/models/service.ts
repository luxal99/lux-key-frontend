/**
 * Lux key API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ServiceKey } from "./serviceKey";
import { Client } from "../../client";
import { WorkService } from "./workService";


export interface Service {
  id: number;
  date: string;
  codingServicePrice: number;
  gross: number;
  createdDate: string;
  lastModifiedDate: string;
  serviceKeys: ServiceKey[];
  notes?: string;
  idClient?: Client;
  serviceType: string;
  idWorkService: WorkService;
}

