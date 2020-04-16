
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface LoginResponse {
    access_token: string;
}

export interface IMutation {
    signup(email: string, password: string): boolean | Promise<boolean>;
    login(email: string, password: string): LoginResponse | Promise<LoginResponse>;
    activateUser(email: string, activationCode: string): boolean | Promise<boolean>;
}

export interface IQuery {
    me(): string | Promise<string>;
}
