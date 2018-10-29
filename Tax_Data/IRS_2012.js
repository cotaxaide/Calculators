        //------------------------------------------------
        var _TY = _StopYear = "2012" // Tax parameters
        //------------------------------------------------

        // Form line numbers
        // var LineNo = [];
                _LineNo[_TY+":CapGains"] = "6";
                _LineNo[_TY+":ExcessAPTC"] = "N/A";
                _LineNo[_TY+":AGI"] = "37";
                _LineNo[_TY+":Foreign"] = "47";
                _LineNo[_TY+":Care"] = "48";
                _LineNo[_TY+":LLC"] = "49";
                _LineNo[_TY+":Retire"] = "50";
                _LineNo[_TY+":CTC"] = "51";
                _LineNo[_TY+":NRCredit"] = "54";
                _LineNo[_TY+":IRP"] = "N/A";
                _LineNo[_TY+":EIC"] = "64";
                _LineNo[_TY+":ACTC"] = "65";
                _LineNo[_TY+":AOC"] = "66";
                _LineNo[_TY+":NetPTC"] = "N/A";
	        _LineNo[_TY+":F8962A"] = "N/A";
	        _LineNo[_TY+":F8962B"] = "N/A";
	        _LineNo[_TY+":F8962F"] = "N/A";

        // var EdExpenseLimits = [];
		// For TNF:
                _EdExpenseLimits["MAX"]  = 0; // First limit
                _EdExpenseLimits["AGI1"] = 1; // AGI max for first limit
                _EdExpenseLimits["MAX1"] = 2; // Second limit
                _EdExpenseLimits["AGI2"] = 3; // AGI max for second limit
                _EdExpenseLimits["MAX2"] = 4; // Final limit
		// For AOC and LLC:
		_EdExpenseLimits["MAX"]  = 0; // First limit
		_EdExpenseLimits["SNG1"] = 1; // AGI max for first limit (SNG, WID, HOH)
		_EdExpenseLimits["SNG2"] = 2; // AGI phase out (SNG, WID, HOH)
		_EdExpenseLimits["MFJ1"] = 3; // AGI max for first limit (MFJ)
		_EdExpenseLimits["MFJ2"] = 4; // AGI phase out (MFJ)
		// For SAV:
		_EdExpenseLimits["N/A"]  = 0; // N/A
		_EdExpenseLimits["SNG"]  = 1; // SAV phase out starts (SNG, HOH)
		_EdExpenseLimits["N/A"]  = 2; // SAV gone (SNG, HOH)
		_EdExpenseLimits["N/A"]  = 3; // SAV phase out starts (MFJ, WID)
		_EdExpenseLimits["N/A"]  = 4; // SAV gone (MFJ, WID)

                _EdExpenseLimits[_TY+":TNF"] = "4000,65000,2000,80000,0";
                _EdExpenseLimits[_TY+":LLC"] = "10000,52000,62000,104000,124000";
                _EdExpenseLimits[_TY+":AOC"] = "4000,80000,90000,160000,180000";
		_EdExpenseLimits[_TY+":SAV"] = "N/A,72850,87850,109250,139250";

        // var Standard = []; // Exemption and standard deductions
                _Standard["Exemption"] = 0; // per person
                _Standard["Minimum"] = 1;
                _Standard["SNG"] = 2; // inc for age 65 or blind
                _Standard["MFS"] = 4;
                _Standard["MFJ"] = 6;
                _Standard["WID"] = 8;
                _Standard["HOH"] = 10;
		_Standard["Kid"] = 12; // kiddie tax unearned income reporting limit (from Form 8815)

                // Standard[year] = Exemption,Mimimum,SNG,inc,   MFS,inc,   MFJ,inc,    WID,inc,    HOH,inc,   Kiddie
                _Standard[_TY] = "3800,     950,    5950,1450, 5950,1150, 11900,1150, 11900,1150, 8700,1450, 1900";

        // var TaxRates = [];
                _TaxRates[_TY+":PCT"] = " 0.10,  0.15,   0.25,   0.28,   0.33,   0.35";
                _TaxRates[_TY+":SNG"] = " 8700, 35350,  85650, 178650, 388350";
                _TaxRates[_TY+":MFJ"] = "17400, 70700, 142700, 217450, 388350";
                _TaxRates[_TY+":WID"] = "17400, 70700, 142700, 217450, 388350";
                _TaxRates[_TY+":MFS"] = " 8700, 35350,  71350, 108725, 194175";
                _TaxRates[_TY+":HOH"] = "12400, 47350, 122300, 198050, 388350";

	// CGRates
                _CGRates[_TY+":PCT"] =  "   0,   0.15";
                _CGRates[_TY+":SNG"] = "34350";
                _CGRates[_TY+":MFJ"] = "70700";
                _CGRates[_TY+":WID"] = "70700";
                _CGRates[_TY+":MFS"] = "35350";
                _CGRates[_TY+":HOH"] = "47350";

	// Self-employment tax rates
		_SESocSec[_TY] = 0.104;
		_SEMedicare[_TY] = 0.029;
		_SEMaxWages[_TY] = 110100;

	// var MedicalExclusion = [];
		_MedicalExclusion[_TY] = "0.100, 0.100";

        // var RetireLimits = [];
                // Source: 1040 instructions
                // MFJ,SNG,HOH,WID,MFS
                _RetireLimits["SNG"] = 0;
                _RetireLimits["WID"] = 0;
                _RetireLimits["MFS"] = 0;
                _RetireLimits["HOH"] = 1;
                _RetireLimits["MFJ"] = 2;
                _RetireLimits[_TY] = "28750,43125,57500";

        // var CTCLimits = [];
                // Source: 1040 instructions
                // MFJ,SNG,HOH,WID,MFS
                _CTCLimits["MFJ"] = 0;
                _CTCLimits["SNG"] = 1;
                _CTCLimits["HOH"] = 1;
                _CTCLimits["WID"] = 1;
                _CTCLimits["MFS"] = 2;
                _CTCLimits[_TY] = "110000,75000,55000";

        // var EICRates = [];
                // Source: search IRS web site "EIC limits" (easier than 1040 instructions)
                // SNG and MFJ are the max AGI endpoints of the phaseout
		// MAX is the cap amount of EIC
		// RATEUP is the ramp-up rate to the cap
		// RATEDOWN is the ramp-down rate from the cap
		// INVEST is the max investment limit to qualify for EIC
                // Columns are: 0, 1, 2, 3 children

                _EICRates[_TY+":SNG"] = "13980,36920,41952,45060";
                _EICRates[_TY+":MFJ"] = "19190,42130,47192,50270";
                _EICRates[_TY+":MAX"] = "475,3169,5236,5891";
                _EICRates[_TY+":RATEUP"] = "0.0765,0.34,0.4,0.45";
                _EICRates[_TY+":RATEDOWN"] = "0.0765,0.1598,0.2106,0.2106";
                _EICRates[_TY+":INVEST"] = 3200;
		
	// var PTCFactorVal = [];
		// A,B are FPL% ranges, C-D are PTC multipliers * 100
		// A-B = C-D : (C+(%%%-A)*(D-C)/(B-A))/100
		// 0-133 = 2-2
		// 133-150 = 3-4
		// 150-200 = 4-6.3
		// 200-250 = 6.3-8.05
		// 250-300 = 8.05-9.5
		// 300-400 = 9.5-9.5
		// 4th column is repayment limitation for single person
		_PTCFactorVal[_TY+":0"] =   "400, 1.00, 1.00";
