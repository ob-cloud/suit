import { BaseEquip } from './BaseEquip';
export declare class LampEquip extends BaseEquip {
    primaryType: string;
    secondaryType: string;
    status: string;
    constructor(status: string, primaryType?: string, secondaryType?: string);
}
