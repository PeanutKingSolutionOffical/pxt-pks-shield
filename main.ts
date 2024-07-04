//% weight=60
//% color=#1c4980 
//% icon="\uf2db" 
//% block="PKS drivers"
namespace pksdriver {
    export enum COMPOUND_EYE_DATA {
        //% block="eye_1"
        IR_1,
        //% block="eye_2"
        IR_2,
        //% block="eye_3"
        IR_3,
        //% block="eye_4"
        IR_4,
        //% block="eye_5"
        IR_5,
        //% block="eye_6"
        IR_6,
        //% block="eye_7"
        IR_7,
        //% block="eye_8"
        IR_8,
        //% block="eye_9"
        IR_9,
        //% block="eye_10"
        IR_10,
        //% block="eye_11"
        IR_11,
        //% block="eye_12"
        IR_12,
        //% block="MAX_EYE_VALUE"
        //% weight=99
        MAX_EYE_VALUE,
        //% block="MAX_EYE"
        //% weight=100
        MAX_EYE,
        //% block="ANGLE"
        //% weight=98
        ANGLE,
        //% block="MODE"
        MODE,
    }

    /**
    * compoundEye read function
    */
    //% blockId=compoundEye block="compound eye $compound_eye_data"  subcategory="Robot"
    //% weight=50
    export function compoundEyeRead(compound_eye_data: COMPOUND_EYE_DATA): number {
        pins.i2cWriteNumber(
            0x13,
            compound_eye_data,
            NumberFormat.UInt8LE,
            false
        )
        let temp = pins.i2cReadNumber(0x13, NumberFormat.UInt8LE, false);
        if (temp == 255) {
            return -1;
        } else if (compound_eye_data == COMPOUND_EYE_DATA.ANGLE) {
            temp *= 2;
        } else if (compound_eye_data == COMPOUND_EYE_DATA.MAX_EYE) {
            temp += 1;
        }
        return temp;
    }

    enum Compass {
        BOARD_ID = 0x08,
        //  Compass     (0x40 - 0x5f) + 6 bytes
        ACC_RAW = 0x40,   // 6  (0-5)
        GYR_RAW = 0x46,   // 6  (6-b)
        MAG_RAW = 0x4c,   // 6  (c-2)

        GET_ROLL = 0x54,   // 2byte
        GET_YAW = 0x56,   // 2byte
        GET_PITCH = 0x58,   // 2byte

        MAG_CENT = 0x5a,   // xxyyzz
        MAG_DATA = 0x3a,   // xxyyzz

        WRI_REG = 0x20,   // write reg

    };
    /**
    * Compass read function, to get the yaw angle
    */
    //% block="yaw (Unit: deg)" subcategory="Acceleration"
    //% weight=70
    export function compassGetYAW(): number {
        let yaw_ang = 0;
        pins.i2cWriteNumber(Compass.BOARD_ID, Compass.GET_YAW, NumberFormat.UInt8BE, false);
        let compass_raw = pins.i2cReadBuffer(Compass.BOARD_ID, 2, false);
        yaw_ang = compass_raw[0] & 0xff;
        yaw_ang |= compass_raw[1] << 8;
        yaw_ang /= 100;
        return yaw_ang;
    }

}