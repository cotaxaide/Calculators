        //----------------------------------------------------------------------------------------
        var _TY = _StopYear = "2017"; // Tax parameters
        //----------------------------------------------------------------------------------------

        // Form line numbers
        // var LineNo = [];
		_LineNo[_TY+":Salary"] = "7";
		_LineNo[_TY+":Pension"] = "16a";
                _LineNo[_TY+":Earned"] = "7+12";
                _LineNo[_TY+":TaxExInc"] = "8b";
                _LineNo[_TY+":CapGains"] = "13";
                _LineNo[_TY+":SSI"] = "20a";
                _LineNo[_TY+":SST"] = "20b";
                _LineNo[_TY+":QBI"] = "";
                _LineNo[_TY+":AGI"] = "37";
                _LineNo[_TY+":TNF"] = "34";
                _LineNo[_TY+":Adjustments"] = "36";
                _LineNo[_TY+":ExcessAPTC"] = "46";
                _LineNo[_TY+":Foreign"] = "48";
                _LineNo[_TY+":Care"] = "49";
                _LineNo[_TY+":LLC"] = "50";
                _LineNo[_TY+":Retire"] = "51";
                _LineNo[_TY+":CTC"] = "52";
                _LineNo[_TY+":COD"] = "";
                _LineNo[_TY+":NRCredit"] = "55";
                _LineNo[_TY+":IRP"] = "61";
                _LineNo[_TY+":EIC"] = "66a";
                _LineNo[_TY+":ACTC"] = "67";
                _LineNo[_TY+":AOC"] = "68";
                _LineNo[_TY+":NetPTC"] = "69";
	        _LineNo[_TY+":F8962A"] = "11a";
	        _LineNo[_TY+":F8962B"] = "11b";
	        _LineNo[_TY+":F8962F"] = "11f";
	        _LineNo[_TY+":F2555"] = "45 & 50";

        // var EdExpenseLimits = [];
		// Source: Pub 970 or Form 8863 (AOC & LLC)
		// For TNF:
                _EdExpenseLimits["MAX"]  = 0;	// First limit
                _EdExpenseLimits["AGI1"] = 1;	// AGI max for first limit
                _EdExpenseLimits["MAX1"] = 2;	// Second limit
                _EdExpenseLimits["AGI2"] = 3;	// AGI max for second limit
                _EdExpenseLimits["MAX2"] = 4;	// Final limit
		// For AOC and LLC:
		_EdExpenseLimits["MAX"]  = 0;	// First limit
		_EdExpenseLimits["SNG1"] = 1;	// AGI max for first limit (SNG, WID, HOH)
		_EdExpenseLimits["SNG2"] = 2;	// AGI phase out (SNG, WID, HOH)
		_EdExpenseLimits["MFJ1"] = 3;	// AGI max for first limit (MFJ)
		_EdExpenseLimits["MFJ2"] = 4;	// AGI phase out (MFJ)
		// For SAV:
		_EdExpenseLimits["N/A"]  = 0;	// N/A
		_EdExpenseLimits["SNG"]  = 1;	// SAV phase out starts (SNG, HOH)
		_EdExpenseLimits["N/A"]  = 2;	// SAV gone (SNG, HOH)
		_EdExpenseLimits["N/A"]  = 3;	// SAV phase out starts (MFJ, WID)
		_EdExpenseLimits["N/A"]  = 4;	// SAV gone (MFJ, WID)
	
                _EdExpenseLimits[_TY+":TNF"] = "4000,65000,2000,80000,0";
                _EdExpenseLimits[_TY+":LLC"] = "10000,56000,66000,112000,132000";
                _EdExpenseLimits[_TY+":AOC"] = "4000,80000,90000,160000,180000";
		_EdExpenseLimits[_TY+":SAV"] = "N/A,77550,92550,116300,146300";	//Needs update
	
        // var Standard = [];	// Exemption and standard deductions	
                _Standard["Exemption"] = 0;
                _Standard["Minimum"] = 1;
                _Standard["SNG"] = 2;
                _Standard["MFS"] = 4;
                _Standard["MFJ"] = 6;
                _Standard["WID"] = 8;
                _Standard["HOH"] = 10;
		_Standard["Kid"] = 12; // kiddie tax unearned income reporting limit (from Form 8815)
		_Standard["DepAsRel"] = 13; // maximum amount of earned income to be a Dependent as Relative

                // Standard[year] = Exemption,Mimimum,  SNG,inc,   MFS,inc,    MFJ,inc,    WID,inc,   HOH,inc,  Kiddie, DepAsRel
                _Standard[_TY] =        "4050,1050,    6350,1550, 6350,1250, 12700,1250, 12700,1250, 9350,1550,  2100,   4050";

	// var ItemLimit = [];
                _ItemLimit[_TY+":SNG"] = 261500;
                _ItemLimit[_TY+":MFJ"] = 313800;
                _ItemLimit[_TY+":WID"] = 313800;
                _ItemLimit[_TY+":MFS"] = 156900;
                _ItemLimit[_TY+":HOH"] = 287650;

	// Self-employment tax rates
		_SESocSec[_TY] = 0.124;
		_SEMedicare[_TY] = 0.029;
		_SEMaxWages[_TY] = 127200;

        // var TaxRates = [];		
                _TaxRates[_TY+":PCT"] = " 0.10,  0.15,   0.25,   0.28,   0.33,   0.35,   0.396";
                _TaxRates[_TY+":SNG"] = " 9325, 37950,  91900, 191650, 416700, 418400";
                _TaxRates[_TY+":MFJ"] = "18650, 75900, 153100, 233350, 416700, 470700";
                _TaxRates[_TY+":WID"] = "18650, 75900, 153100, 233350, 416700, 470700";
                _TaxRates[_TY+":MFS"] = " 9325, 37950,  76550, 116675, 208350, 235350";
                _TaxRates[_TY+":HOH"] = "13350, 50800, 131200, 212500, 416700, 444550";

	// CGRates
                _CGRates[_TY+":PCT"] =  "   0,   0.15,  0.20";
                _CGRates[_TY+":SNG"] = "37950, 418400";
                _CGRates[_TY+":MFJ"] = "75900, 470700";
                _CGRates[_TY+":WID"] = "75900, 470700";
                _CGRates[_TY+":MFS"] = "37950, 235350";
                _CGRates[_TY+":HOH"] = "50800, 444550";

	// var MedicalExclusion = [];
		_MedicalExclusion[_TY] = "0.075, 0.075";

        // var RetireLimits = [];
                // Source: 1040 instructions for line 51
                // MFJ,SNG,HOH,WID,MFS	
                _RetireLimits["SNG"] = 0;
                _RetireLimits["WID"] = 0;
                _RetireLimits["MFS"] = 0;
                _RetireLimits["HOH"] = 1;
                _RetireLimits["MFJ"] = 2;
                _RetireLimits[_TY] = "31000,46500,62000";
	
        // var CTCLimits = [];
                // Source: 1040 instructions for line 52
                // MFJ,SNG,HOH,WID,MFS	
                _CTCLimits["MFJ"] = 0;
                _CTCLimits["SNG"] = 1;
                _CTCLimits["HOH"] = 1;
                _CTCLimits["WID"] = 1;
                _CTCLimits["MFS"] = 2;
                //_CTCLimits[_TY] = "110000,75000,55000";
                _CTCLimits[_TY+":AGICap"] = "110000,75000,55000";
		_CTCLimits[_TY+":CTCRate"] = 1000;
		_CTCLimits[_TY+":FTCRate"] = 0;
		_CTCLimits[_TY+":ACTCRate"] = 1000;
		_CTCLimits[_TY+":ACTCThreshold"] = 3000;
	
        // var EICRates = [];
                // Source: search IRS web site "EIC limits" (easier than 1040 instructions)	
		// In 1040 instructions, see the EIC table footnotes for limits
		// AGISNG and AGIMFJ are the amounts above which AGI must also be tested
                // SNG and MFJ are the max AGI endpoints of the phaseout	
		// WID and HOH are same as SNG, MFS donesn't qualify
		// MAX is the cap amount of EIC	
		// RATEUP is the ramp-up rate to the cap	
		// RATEDOWN is the ramp-down rate from the cap	
		// INVEST is the max investment limit to qualify for EIC	
                // Columns are: 0, 1, 2, 3 children	

                _EICRates[_TY+":AGISNG"] =   "  8350,  18350,  18350,  18350";
                _EICRates[_TY+":AGIMFJ"] =   " 13950,  23950,  23950,  23950";
                _EICRates[_TY+":SNG"] =      " 15010,  39617,  45007,  48340";
                _EICRates[_TY+":MFJ"] =      " 20600,  45207,  50597,  53930";
                _EICRates[_TY+":MAX"] =      "   510,   3400,   5616,   6318";
                _EICRates[_TY+":RATEUP"] =   "0.0765,   0.34,    0.4,   0.45";
                _EICRates[_TY+":RATEDOWN"] = "0.0765, 0.1598, 0.2106, 0.2106";
                _EICRates[_TY+":INVEST"] = 3450;

	// var FPL = [];
		_FPL[_TY+":US"] =     "12060, 4180";
		_FPL[_TY+":Alaska"] = "15060, 5230";
		_FPL[_TY+":Hawaii"] = "13860, 4810";
		//_FPL[_TY+":US"] =     "4180";
		//_FPL[_TY+":Alaska"] = "5230";
		//_FPL[_TY+":Hawaii"] = "4810";
	
	// var PTCFactorVal = [];
		// A,B are FPL% ranges, C-D are PTC multipliers * 100	
		// A-B = C-D : (C+(%%%-A)*(D-C)/(B-A))/100	
		// 0-133 = 2-2	
		// 133-150 = 3-4	
		// 150-200 = 4-6.3	
		// 200-250 = 6.3-8.05	
		// 250-300 = 8.05-9.5	
		// 300-400 = 9.5-9.5	
		// col 4 = SNG APTC repayment limit

		_PTCFactorVal[_TY+":0"] =   "133, 2.04, 2.04,  300";
		_PTCFactorVal[_TY+":133"] = "150, 3.06, 4.08,  300";
		_PTCFactorVal[_TY+":150"] = "200, 4.08, 6.43,  300";
		_PTCFactorVal[_TY+":200"] = "250, 6.43, 8.21,  750";
		_PTCFactorVal[_TY+":250"] = "300, 8.21, 9.69,  750";
		_PTCFactorVal[_TY+":300"] = "400, 9.69, 9.69, 1250";

	// var AffordRate = [];
		_AffordRate[_TY] = 0.0816;

	// var AffordRateEmployerSelf = [];
		_AffordRateEmployerSelf[_TY] = 0.0969;
		
	// var Qualified Business Income Deduction
		_QBILimits[_TY+":Rate"] = 0;
		_QBILimits[_TY+":SNG"] = "0";
		_QBILimits[_TY+":MFJ"] = "0";
		_QBILimits[_TY+":MFS"] = "0";
		_QBILimits[_TY+":HOH"] = "0";
		_QBILimits[_TY+":WID"] = "0";
