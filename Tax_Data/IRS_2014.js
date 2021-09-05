        //----------------------------------------------------------------------------------------
        var _TY = _StopYear = "2014" // Tax parameters
        //----------------------------------------------------------------------------------------

        // Form line numbers
        // var LineNo = [];
		_LineNo[_TY+":Salary"] = "7";
		_LineNo[_TY+":Pension"] = "16a";
                _LineNo[_TY+":TaxExInc"] = "8b";
                _LineNo[_TY+":CapGains"] = "13";
                _LineNo[_TY+":SSI"] = "20a";
                _LineNo[_TY+":SST"] = "20b";
                _LineNo[_TY+":CapGains"] = "13";
                _LineNo[_TY+":AGI"] = "37";
                _LineNo[_TY+":ExcessAPTC"] = "46";
                _LineNo[_TY+":Foreign"] = "48";
                _LineNo[_TY+":Care"] = "49";
                _LineNo[_TY+":LLC"] = "50";
                _LineNo[_TY+":Retire"] = "51";
                _LineNo[_TY+":CTC"] = "52";
                _LineNo[_TY+":NRCredit"] = "55";
                _LineNo[_TY+":IRP"] = "61";
                _LineNo[_TY+":EIC"] = "66";
                _LineNo[_TY+":ACTC"] = "67";
                _LineNo[_TY+":AOC"] = "68";
                _LineNo[_TY+":NetPTC"] = "69";
	        _LineNo[_TY+":F8962A"] = "11A";
	        _LineNo[_TY+":F8962B"] = "11B";
	        _LineNo[_TY+":F8962F"] = "11F";
	        _LineNo[_TY+":F2555"] = "45 & 50";

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
                _EdExpenseLimits[_TY+":LLC"] = "10000,54000,64000,108000,128000";
                _EdExpenseLimits[_TY+":AOC"] = "4000,80000,90000,160000,180000";
		_EdExpenseLimits[_TY+":SAV"] = "N/A,76000,91000,113950,143950";

        // var Standard = []; // Exemption and standard deductions
                _Standard["Exemption"] = 0; // per person
                _Standard["Minimum"] = 1;
                _Standard["SNG"] = 2; // +1 = inc for age 65 or blind
                _Standard["MFS"] = 4;
                _Standard["MFJ"] = 6;
                _Standard["WID"] = 8;
                _Standard["HOH"] = 10;
		_Standard["Kid"] = 12; // kiddie tax unearned income reporting limit (from Form 8815)

                // Standard[year] = Exemption,Mimimum,SNG,inc,   MFS,inc,   MFJ,inc,    WID,inc,    HOH,inc,   Kiddie
                _Standard[_TY] = "3950,    1000,    6200,1550, 6200,1200, 12400,1200, 12400,1200, 9100,1550, 2000";

        // var TaxRates = [];
                _TaxRates[_TY+":PCT"] = " 0.10,  0.15,   0.25,   0.28,   0.33,   0.35,   0.396";
                _TaxRates[_TY+":SNG"] = " 9075, 36900,  89350, 186350, 405100, 406750";
                _TaxRates[_TY+":MFJ"] = "18150, 73800, 148850, 226850, 406100, 457600";
                _TaxRates[_TY+":WID"] = "18150, 73800, 148850, 226850, 406100, 457600";
                _TaxRates[_TY+":MFS"] = " 9075, 36900,  74425, 113425, 202550, 228800";
                _TaxRates[_TY+":HOH"] = "12950, 49400, 127550, 206600, 405100, 432200";
       
	// CGRates
                _CGRates[_TY+":PCT"] =  "   0,   0.15,  0.20";
                _CGRates[_TY+":SNG"] = "36900, 406750";
                _CGRates[_TY+":MFJ"] = "73800, 457600";
                _CGRates[_TY+":WID"] = "73800, 457600";
                _CGRates[_TY+":MFS"] = "36900, 228800";
                _CGRates[_TY+":HOH"] = "49400, 432200";

	// Self-employment tax rates
		_SESocSec[_TY] = 0.124;
		_SEMedicare[_TY] = 0.029;
		_SEMaxWages[_TY] = 117000;

	// var MedicalExclusion = [];
		_MedicalExclusion[_TY] = "0.100, 0.075";

        // var CTCLimits = [];
                // Source: 1040 instructions
                // MFJ,SNG,HOH,WID,MFS
                _CTCLimits["MFJ"] = 0;
                _CTCLimits["SNG"] = 1;
                _CTCLimits["HOH"] = 1;
                _CTCLimits["WID"] = 1;
                _CTCLimits["MFS"] = 2;
                _CTCLimits[_TY+":AGICap"] = "110000,75000,55000";
		_CTCLimits[_TY+":CTCRate"] = 1000;
		_CTCLimits[_TY+":FTCRate"] = 0;
		_CTCLimits[_TY+":ACTCRate"] = 1000;
		_CTCLimits[_TY+":ACTCThreshold"] = 3000;

        // var EICRates = [];
                // Source: search IRS web site "EIC limits" (easier than 1040 instructions)
                // SNG and MFJ are the max AGI endpoints of the phaseout
		// MAX is the cap amount of EIC
		// RATEUP is the ramp-up rate to the cap
		// RATEDOWN is the ramp-down rate from the cap
		// INVEST is the max investment limit to qualify for EIC
                // Columns are: 0, 1, 2, 3 children

                _EICRates[_TY+":AGISNG"] =   "  8150,  17850,  17850,  17850";
                _EICRates[_TY+":AGIMFJ"] =   " 13550,  23300,  23300,  23300";
                _EICRates[_TY+":SNG"] = "14590,38511,43756,46997";
                _EICRates[_TY+":MFJ"] = "20020,43941,49186,52427";
                _EICRates[_TY+":MAX"] = "496,3305,5460,6143";
                _EICRates[_TY+":RATEUP"] = "0.0765,0.34,0.4,0.45";
                _EICRates[_TY+":RATEDOWN"] = "0.0765,0.1598,0.2106,0.2106";
                _EICRates[_TY+":INVEST"] = 3350;

	// var FPL = [];
		_FPL[_TY+":US"] =     "11670, 4060";
		_FPL[_TY+":Alaska"] = "14580, 5080";
		_FPL[_TY+":Hawaii"] = "13420, 4670";

	// var PTCFactorVal = [];
		// A,B are FPL% ranges, C-D are PTC multipliers * 100
		// A-B = C-D : (C+(%%%-A)*(D-C)/(B-A))/100
		// 0-133 = 2-2
		// 133-150 = 3-4
		// 150-200 = 4-6.3
		// 200-250 = 6.3-8.05
		// 250-300 = 8.05-9.5
		// 300-400 = 9.5-9.5
		_PTCFactorVal[_TY+":0"] =   "133, 2.00, 2.00,  300";
		_PTCFactorVal[_TY+":133"] = "150, 3.00, 4.00,  300";
		_PTCFactorVal[_TY+":150"] = "200, 4.00, 6.30,  300";
		_PTCFactorVal[_TY+":200"] = "250, 6.30, 8.05,  750";
		_PTCFactorVal[_TY+":250"] = "300, 8.05, 9.50,  750";
		_PTCFactorVal[_TY+":300"] = "400, 9.50, 9.50, 1250";

	// var AffordRate = [];
		_AffordRate[_TY] = 0.08;

	// var AffordRateEmployerSelf = [];
		_AffordRateEmployerSelf[_TY] = 0.0950;
