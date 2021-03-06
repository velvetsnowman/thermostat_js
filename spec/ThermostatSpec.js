describe("Theromostat", function(){

  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  describe("temperature", function(){

    it('has an initial temperature of 20 degrees', function(){
      expect(thermostat.currentTemperature()).toEqual(20);
    });
    it('has a minimum temperature of 10', function(){
      expect(thermostat.minTemperature).toEqual(10);
    });

  });

  describe("can change the temperature", function(){
    it('increases it by 1 by default', function(){
      thermostat.increaseTemperature();
      expect(thermostat.temperature).toEqual(21);
    });
    it('decreases it by 1 by default', function(){
      thermostat.decreaseTemperature();
      expect(thermostat.temperature).toEqual(19);
    });
    it("by increasing it", function(){
      thermostat.increaseTemperature(5);
      expect(thermostat.temperature).toEqual(25);
    });

    it("by decreasing it", function(){
      thermostat.decreaseTemperature(5);
      expect(thermostat.temperature).toEqual(15);
    });

    it("but can not go below 10 degrees", function(){
      expect(function () {thermostat.decreaseTemperature(11);}).toThrowError("Exceeds minimum temperature of 10");
    });

    it("but can not go above max temperature when Power Saving mode is on", function(){
      expect(function () {thermostat.increaseTemperature(6);}).toThrowError("Exceeds maximum temperature");
    });

    it("but can not go above max temperature when Power Saving mode is off", function(){
      thermostat.changePowerSavingMode('OFF')
      expect(function () {thermostat.increaseTemperature(13);}).toThrowError("Exceeds maximum temperature");
    });

  });

  describe("has a reset button", function(){
    it("and returns the temperature to 20 degrees", function(){
      thermostat.increaseTemperature(4);
      thermostat.resetThermostat();
      expect(thermostat.temperature).toEqual(20);
    });
  });

  describe("can indicate the current energy usage", function(){
    it("as being low", function(){
      thermostat.decreaseTemperature(5);
      expect(thermostat.energyUsage()).toEqual('low-usage');
    });
    it("as being medium", function(){
      expect(thermostat.energyUsage()).toEqual('medium-usage');
    });
    it("as being high", function(){
      thermostat.changePowerSavingMode('OFF');
      thermostat.increaseTemperature(6);
      expect(thermostat.energyUsage()).toEqual('high-usage');
    });
  });
});
