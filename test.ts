// tests go here; this will not be compiled when this package is used as an extension.
basic.forever(function () {
    serial.writeLine('compound eye readings')
    serial.writeNumber(pksdriver.compoundEyeRead(pksdriver.COMPOUND_EYE_DATA.MAX_EYE)) 
    serial.writeNumber(pksdriver.compoundEyeRead(pksdriver.COMPOUND_EYE_DATA.MAX_EYE_VALUE)) // if the test is passed, a non-zero number should be shown
    serial.writeString("----------")
    serial.writeString("compass reading")
    serial.writeNumber(pksdriver.compassGetYAW()) // if the test is passed, the number returned should change as the compass is rotated
    serial.writeString("------------")
    basic.pause(1000)
})