        //------------------------------------------------
        var _TY = _StopYear = "2013" // Tax parameters
        //------------------------------------------------

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
                _LineNo[_TY+":ExcessAPTC"] = "N/A";
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
                _EdExpenseLimits[_TY+":LLC"] = "10000,53000,63000,107000,127000";
                _EdExpenseLimits[_TY+":AOC"] = "4000,80000,90000,160000,180000";
		_EdExpenseLimits[_TY+":SAV"] = "N/A,74700,89700,112050,142050";
                
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
                _Standard[_TY] = "3900,    1000,    6100,1500, 6100,1200, 12200,1200, 12200,1200, 8950,1500, 2000";

        // var TaxRates = [];

                _TaxRates[_TY+":PCT"] = " 0.10,  0.15,   0.25,   0.28,   0.33,   0.35,   0.396";
                _TaxRates[_TY+":SNG"] = " 8925, 36250,  87850, 183250, 398350, 400000";
                _TaxRates[_TY+":MFJ"] = "17850, 72500, 146400, 223050, 398350, 450000";
                _TaxRates[_TY+":WID"] = "17850, 72500, 146400, 223050, 398350, 450000";
                _TaxRates[_TY+":MFS"] = " 8925, 36250,  73200, 111525, 199175, 225000"
                _TaxRates[_TY+":HOH"] = "12750, 48600, 125450, 203150, 398350, 425000";

      	// CGRates
                _CGRates[_TY+":PCT"] =  "   0,   0.15,  0.20";
                _CGRates[_TY+":SNG"] = "36250, 400000";
                _CGRates[_TY+":MFJ"] = "72500, 45000";
                _CGRates[_TY+":WID"] = "72500, 45000";
                _CGRates[_TY+":MFS"] = "36250, 225000";
                _CGRates[_TY+":HOH"] = "48600, 425000";
 
	// Self-employment tax rates
		_SESocSec[_TY] = 0.124;
		_SEMedicare[_TY] = 0.029;
		_SEMaxWages[_TY] = 113700;

	// var MedicalExclusion = [];
		_MedicalExclusion[_TY] = "0.100, 0.075";

        // var RetireLimits = [];
                // Source: 1040 instructions
                // MFJ,SNG,HOH,WID,MFS
                _RetireLimits["SNG"] = 0;
                _RetireLimits["WID"] = 0;
                _RetireLimits["MFS"] = 0;
                _RetireLimits["HOH"] = 1;
                _RetireLimits["MFJ"] = 2;
                _RetireLimits[_TY] = "29500,44250,59000";

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

                _EICRates[_TY+":SNG"] = "14340,37870,43038,46227";
                _EICRates[_TY+":MFJ"] = "19680,43210,48378,51567";
                _EICRates[_TY+":MAX"] = "487,3250,5372,6044";
                _EICRates[_TY+":RATEUP"] = "0.0765,0.34,0.4,0.45";
                _EICRates[_TY+":RATEDOWN"] = "0.0765,0.1598,0.2106,0.2106";
                _EICRates[_TY+":INVEST"] = 3300;
		
	// var FPL = [];
		_FPL[_TY+":US"] =     "11490, 4020";
		_FPL[_TY+":Alaska"] = "14350, 5030";
		_FPL[_TY+":Hawaii"] = "13230, 4620";
		
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
