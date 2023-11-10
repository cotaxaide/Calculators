        //----------------------------------------------------------------------------------------
        var _TY = _StopYear = "2021"; // Tax parameters
	_Preliminary[_TY] = false; // Preliminary information
        //----------------------------------------------------------------------------------------

        // Form line numbers
        // var LineNo = [];
		// 1040
		_LineNo[_TY+":Salary"] = "1";
                _LineNo[_TY+":Earned"] = "1&S1-3";
                _LineNo[_TY+":TaxExInc"] = "2a";
                _LineNo[_TY+":QualDiv"] = "3a";
		_LineNo[_TY+":Pension"] = "4b+5b";
                _LineNo[_TY+":SSI"] = "6a";
                _LineNo[_TY+":SST"] = "6b";
                _LineNo[_TY+":CapGains"] = "7";
                _LineNo[_TY+":AGI"] = "11";
                _LineNo[_TY+":Deductions"] = "12";
                _LineNo[_TY+":QBI"] = "13";
                _LineNo[_TY+":Taxable"] = "15";
                _LineNo[_TY+":TaxAmount"] = "16";
                _LineNo[_TY+":CTC"] = "19";
                _LineNo[_TY+":COD"] = "19";
                _LineNo[_TY+":NRCredit"] = "21";
                _LineNo[_TY+":EIC"] = "27";
                _LineNo[_TY+":ACTC"] = "28";
                _LineNo[_TY+":AOC"] = "29";
		// Schedules 1-3
		_LineNo[_TY+":Business"] = "S1-3";
                _LineNo[_TY+":SEP"] = "S1-16";
                _LineNo[_TY+":SEHI"] = "S1-17";
                _LineNo[_TY+":TNF"] = "";
                _LineNo[_TY+":IRADed"] = "S1-20";
                _LineNo[_TY+":StudLoan"] = "S1-21";
                _LineNo[_TY+":Adjustments"] = "S1-25";
                _LineNo[_TY+":ExcessAPTC"] = "S2-2";
                _LineNo[_TY+":Foreign"] = "S3-1";
                _LineNo[_TY+":Care"] = "S3-2";
                _LineNo[_TY+":LLC"] = "S3-3";
                _LineNo[_TY+":Retire"] = "S3-4";
                _LineNo[_TY+":IRP"] = "";
                _LineNo[_TY+":NetPTC"] = "S3-9";
		// Qualified dividends and cap gains worksheet
                _LineNo[_TY+":QDCG"] = "12";	// Needs update
		// Schedule A
	        _LineNo[_TY+":StateWH"] = "5a"; 
	        _LineNo[_TY+":Property"] = "5b"; 
		_LineNo[_TY+":SALT"] = "5d";
                _LineNo[_TY+":CashContrib"] = "11";
                _LineNo[_TY+":ItemDed"] = "17";	
		_LineNo[_TY+":UseSchedA"] = "18";
		// Form 2555
	        _LineNo[_TY+":F2555"] = "45 & 50";
		// Form 8962
	        _LineNo[_TY+":F8962A"] = "11a";	
	        _LineNo[_TY+":F8962B"] = "11b";	
	        _LineNo[_TY+":F8962F"] = "11f";	

        // var EdExpenseLimits = [];
		// Source: Pub 970 or Form 8863 (AOC & LLC)
		// For TNF:
                _EdExpenseLimits["MAX"]  = 0;	// First limit
                _EdExpenseLimits["AGI1"] = 1;	// AGI max for first limit
                _EdExpenseLimits["MAX1"] = 2;	// Second limit
                _EdExpenseLimits["AGI2"] = 3;	// AGI max for second limit
                _EdExpenseLimits["MAX2"] = 4;	// Final limit
		// For AOC and LLC:
		_EdExpenseLimits["MAX"]  = 0;	// First limit	// Needs update
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
        
		_EdExpenseLimits[_TY+":TNF"] = "    0,     0,    0,       0,      0";
		_EdExpenseLimits[_TY+":LLC"] = "10000, 80000, 90000, 160000, 180000";
		_EdExpenseLimits[_TY+":AOC"] = " 4000, 80000, 90000, 160000, 180000";
		_EdExpenseLimits[_TY+":SAV"] = "  N/A, 70000, 85000, 140000, 170000";	// Needs update
		_EdExpenseLimits[_TY+":INT"] = " 2500, 70000, 85000, 140000, 170000";

        // var Standard = [];	// Exemption and standard deductions
                _Standard["Exemption"] = 0;
                _Standard["Minimum"] = 1;
                _Standard["SNG"] = 2;
                _Standard["MFS"] = 4;
                _Standard["MFJ"] = 6;
                _Standard["WID"] = 8;
                _Standard["HOH"] = 10;
		_Standard["Kid"] = 12; // kiddie tax unearned income reporting limit (from Form 8815)
		_Standard["DepAsRel"] = 13; // maximum earned income to be a Dependent as a Relative
		_Standard["DependInc"] = 14; // increment to earned income for a dependent

                // Standard[year] = Exemption,Mimimum,  SNG,inc,    MFS,inc,    MFJ,inc,    WID,inc,    HOH,inc,  Kiddie, DepAsRel,	DependInc
                _Standard[_TY] = "          0,1100,   12550,1700, 12550,1350, 25100,1350, 25100,1350, 18800,1700,  2200,   4300,	350";

	// var ItemLimit = []; // Limit repealed by new tax law
                _ItemLimit[_TY+":SNG"] = 10000000; //261500;	// Needs update
                _ItemLimit[_TY+":MFJ"] = 10000000; //313800;	// Needs update
                _ItemLimit[_TY+":WID"] = 10000000; //313800;	// Needs update
                _ItemLimit[_TY+":MFS"] = 10000000; //156900;	// Needs update
                _ItemLimit[_TY+":HOH"] = 10000000; //287650;	// Needs update

        // var TaxRates = [];
                _TaxRates[_TY+":PCT"] = " 0.10,  0.12,   0.22,   0.24,   0.32,   0.35,   0.37";	
                _TaxRates[_TY+":SNG"] = " 9950, 40525,  86375, 164925, 209425, 523600";	
                _TaxRates[_TY+":MFJ"] = "19900, 81050, 172750, 329850, 418850, 628300";	
                _TaxRates[_TY+":WID"] = "19900, 81050, 172750, 329850, 418850, 628300";	
                _TaxRates[_TY+":MFS"] = " 9950, 40525,  86375, 164925, 209425, 314150";
                _TaxRates[_TY+":HOH"] = "14200, 54200,  86350, 164900, 209400, 523600";
                _TaxRates[_TY+":TRUST"]=" 2600,  2600,   2600,   9450,   9450,  12950";		// for testing	// Needs update

	// CGRates
                _CGRates[_TY+":PCT"] = "    0,   0.15,   0.20";
                _CGRates[_TY+":SNG"] = "40400, 445850";
                _CGRates[_TY+":MFJ"] = "80800, 501600";
                _CGRates[_TY+":WID"] = "80800, 501600";	
                _CGRates[_TY+":MFS"] = "40400, 250800";
                _CGRates[_TY+":HOH"] = "54100, 473750";
                _CGRates[_TY+":TRUST"]=" 2650,  13250";

	// Self-employment tax rates
	// SEMedicarePlus is the additional increment when SEMedicarePlusAGI is exceded
		_SETaxRate[_TY+":SSRate"] = 0.124;
		_SETaxRate[_TY+":MCRate"] = 0.029;
		_SETaxRate[_TY+":SSWageCap"] = 142800;
		_SETaxRate[_TY+":AMCRate"] = 0.000;
		_SETaxRate[_TY+":AMCStart"] = 200000;


	// var MedicalExclusion = [];
		_MedicalExclusion[_TY] = "0.075, 0.075";

	// StateTaxCap
		_SALT[_TY] = 10000;	// Needs update

        // var CTCLimits = [];
                // Source: 1040 instructions for line 52 and Form 8812
                // MFJ,SNG,HOH,WID,MFS
                _CTCLimits["MFJ"] = 0;
                _CTCLimits["SNG"] = 1;
                _CTCLimits["WID"] = 1;
                _CTCLimits["MFS"] = 2;
                _CTCLimits["HOH"] = 3;
                _CTCLimits[_TY+":AGICap"]  = "400000, 200000, 200000, 200000";
		_CTCLimits[_TY+":CTCRate"] = 2000;
                _CTCLimits[_TY+":AGI0Cap"] = "150000,  75000,  75000, 112500";
		_CTCLimits[_TY+":CTC0Rate"] = 1600;
		_CTCLimits[_TY+":CTC6Rate"] = 1000;
		_CTCLimits[_TY+":FTCRate"] = 500;
		_CTCLimits[_TY+":ACTCRate"] = 1000000;
		_CTCLimits[_TY+":ACTCThreshold"] = 0;

       	// var CareRates = [];
		// Source: Pub 503
		_CareLimits[_TY+":RateMax"] = 50;
		_CareLimits[_TY+":RateMin"] = 20;
		_CareLimits[_TY+":AGICap"] = 125000;
		_CareLimits[_TY+":AGICap2"] = 400000;

        // var EICRates = [];
                // Source: search IRS web site "EIC limits" (easier than 1040 instructions)
		// In 1040 instructions, see the EIC table footnotes for limits
		// AGISNG and AGIMFJ are the amounts above which AGI must also be tested
                // SNG and MFJ are the max AGI endpoints of the phaseout
		// WID and HOH are same as SNG, MFS doesn't qualify
		// MAX is the cap amount of EIC
		// RATEUP is the ramp-up rate to the cap
		// RATEDOWN is the ramp-down rate from the cap
		// INVEST is the max investment limit to qualify for EIC
                // Columns are: 0, 1, 2, 3+ children
		// Needs update
                _EICRates[_TY+":AGISNG"] =   "  8880,  19520,  19520,  19520";
                _EICRates[_TY+":AGIMFJ"] =   " 14820,  25470,  25470,  25470";
                _EICRates[_TY+":SNG"] =      " 21430,  42158,  47915,  51464";
                _EICRates[_TY+":MFJ"] =      " 27380,  48108,  53865,  57414";
                _EICRates[_TY+":MAX"] =      "  1502,   3618,   5980,   6728";	
                _EICRates[_TY+":RATEUP"] =   " 0.153,   0.34,    0.4,   0.45";
                _EICRates[_TY+":RATEDOWN"] = " 0.153,  0.160, 0.2106, 0.2106";
                _EICRates[_TY+":INVEST"] = 10000;

	// var FPL = [];
		_FPL[_TY+":US"] =     "12880, 4540";
		_FPL[_TY+":Alaska"] = "16090, 5680";
		_FPL[_TY+":Hawaii"] = "14820, 5220";

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

		_PTCFactorVal[_TY+":0"] =   "133, 0.00, 0.00,  325";
		_PTCFactorVal[_TY+":133"] = "150, 0.00, 2.00,  325";
		_PTCFactorVal[_TY+":150"] = "200, 2.00, 4.00,  800";
		_PTCFactorVal[_TY+":200"] = "250, 4.00, 6.00,  800";
		_PTCFactorVal[_TY+":250"] = "300, 6.00, 8.50,  800";
		_PTCFactorVal[_TY+":300"] = "400, 8.50, 8.50, 1350";

	// var AffordRate = [];
		_AffordRate[_TY] = 0.0805;

	// var AffordRateEmployerSelf = [];
		_AffordRateEmployerSelf[_TY] = 0.0986;

	// var Qualified Business Income Deduction
		_QBILimits[_TY+":Rate"] = "0.2";
		_QBILimits[_TY+":MFJ"] = "329800";
		_QBILimits[_TY+":MFS"] = "164925";
		_QBILimits[_TY+":SNG"] = 
		_QBILimits[_TY+":HOH"] = 
		_QBILimits[_TY+":WID"] = "164900";

	// Net Investment Income Tax
		_NIITLimits[_TY+":Rate"] = "0.038";
		_NIITLimits[_TY+":SNG"] = 
		_NIITLimits[_TY+":HOH"] = "200000"
		_NIITLimits[_TY+":MFJ"] = 
		_NIITLimits[_TY+":WID"] = "250000";
		_NIITLimits[_TY+":MFS"] = "125000";

	// Alternative Minimum Tax
		//                  Exempt  Phaseout
		_AMT[_TY+":MFJ"] = "114600, 1047200";
		_AMT[_TY+":SNG"] = "73600,   523600";
		_AMT[_TY+":MFS"] = "57300,   523600";
		_AMT[_TY+":WID"] = "73600,   523600";
		_AMT[_TY+":HOH"] = "73600,   523600";
		_AMT[_TY+":TRUST"]="25700,    85650";
		_AMT[_TY+":KIDDIE"]="7950,   510300";		// (Exempt + earned) up to SNG rate
		
	// Health Savings Account (HSA)
		_HSA[_TY+":IND"] = 3600;
		_HSA[_TY+":FAM"] = 7150;

	// Retirement Savings Contribution (Form 8880)
		_RETIRE[_TY+":Rate"]= "	 0.5,	  0.2,	  0.1,	0";
		_RETIRE[_TY+":MFJ"] = "39500,	43000,	66000";
		_RETIRE[_TY+":HOH"] = "29625,	33250,	49500";
		_RETIRE[_TY+":SNG"] = 
		_RETIRE[_TY+":WID"] = 
		_RETIRE[_TY+":MFS"] = "19750,	21500,	33000";

	// IRA Adjustment limits and phase-out
		_IRALimits[_TY+":AGE"] = 50;
		_IRALimits[_TY+":MAX"] = 6000;
		_IRALimits[_TY+":SRMAX"] = 7000;

		_IRALimits[_TY+":SNG"] = 
		_IRALimits[_TY+":MFS"] = 
		_IRALimits[_TY+":HOH"] = "76000";
		_IRALimits[_TY+":WID"] = "125000";
		// Col 1 = ret plan, Col 2 = no ret plan, final phase out
		// start of phase out is 20000 less
		_IRALimits[_TY+":MFJ"] = "125000, 208000";
		
	// Medicare PartB MFS Premium Threshhold
		_MEDBMFS[_TY] = 88000;

	// Educator expenses
		_EDExpenses[_TY+":EDEXP"] = 250;
