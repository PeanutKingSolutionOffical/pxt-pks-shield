// tests go here; this will not be compiled when this package is used as an extension.
basic.forever(function () {
    serial.writeLine('compound eye readings')
    serial.writeNumber(pksdriver.compoundEyeRead(pksdriver.compoundEyeData.max_eye)) 
    serial.writeNumber(pksdriver.compoundEyeRead(pksdriver.compoundEyeData.max_eye_value)) // if the test is passed, a non-zero number should be shown
    serial.writeString("----------")
    serial.writeString("compass reading")
    serial.writeNumber(pksdriver.compass_get_yaw()) // if the test is passed, the number returned should change as the compass is rotated
    serial.writeString("------------")
    basic.pause(1000)
})