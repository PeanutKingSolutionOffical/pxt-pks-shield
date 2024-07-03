// tests go here; this will not be compiled when this package is used as an extension.
basic.forever(function () {
    serial.writeNumber(pksdriver.compoundEyeRead(pksdriver.compoundEyeData.max_eye))
    serial.writeNumber(pksdriver.compoundEyeRead(pksdriver.compoundEyeData.max_eye_value))
    serial.writeString("----------")
    serial.writeNumber(pksdriver.compass_get_yaw())
    serial.writeString("------------")
    basic.pause(1000)
})