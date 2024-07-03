//% weight=60
//% color=#1c4980 
//% icon="\uf2db" 
//% block="PKS drivers"
namespace pksdriver {
    export enum compoundEyeData {
        //% block="eye_1"
        ir_1,
        //% block="eye_2"
        ir_2,
        //% block="eye_3"
        ir_3,
        //% block="eye_4"
        ir_4,
        //% block="eye_5"
        ir_5,
        //% block="eye_6"
        ir_6,
        //% block="eye_7"
        ir_7,
        //% block="eye_8"
        ir_8,
        //% block="eye_9"
        ir_9,
        //% block="eye_10"
        ir_10,
        //% block="eye_11"
        ir_11,
        //% block="eye_12"
        ir_12,
        //% block="max_eye_value"
        //% weight=99
        max_eye_value,
        //% block="max_eye"
        //% weight=100
        max_eye,
        //% block="angle"
        //% weight=98
        angle,
        //% block="mode"
        mode,
    }

    /**
    * compoundEye read function
    */
    //% blockId=compoundEye block="compound eye $compound_eye_data"  subcategory="Robot"
    //% weight=50
    export function compoundEyeRead(compound_eye_data: compoundEyeData): number {
        pins.i2cWriteNumber(
            0x13,
            compound_eye_data,
            NumberFormat.UInt8LE,
            false
        )
        let temp = pins.i2cReadNumber(0x13, NumberFormat.UInt8LE, false);
        if (temp == 255) {
            return -1;
        } else if (compound_eye_data == compoundEyeData.angle) {
            temp *= 2;
        } else if (compound_eye_data == compoundEyeData.max_eye) {
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
    export function compass_get_yaw(): number {
        let yaw_ang = 0;
        pins.i2cWriteNumber(Compass.BOARD_ID, Compass.GET_YAW, NumberFormat.UInt8BE, false);
        let compass_raw = pins.i2cReadBuffer(Compass.BOARD_ID, 2, false);
        yaw_ang = compass_raw[0] & 0xff;
        yaw_ang |= compass_raw[1] << 8;
        yaw_ang /= 100;
        return yaw_ang;
    }

}