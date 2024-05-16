//County_Tax[INDEX] = DATA;
//City+Tax[INDEX] = DATA;
//	INDEX = City ":" Year
//	DATA = County tax rate ":" IRS Code ":" Other taxes
//	Remember to add a new city to the 2000.js file as well
//	Updated DR 1002 7/01/23
COTY = "2023";
State_Tax['CO:'+COTY] = '4.4';
County_Tax['Adams:'+COTY] = '0.75::RTD=1:CD=0.1';
County_Tax['Alamosa:'+COTY] = '3:';
County_Tax['Arapahoe:'+COTY] = '0.25::RTD=1:CD=0.1';
County_Tax['Archuleta:'+COTY] = '4:';
County_Tax['Baca:'+COTY] = '0:';
County_Tax['Bent:'+COTY] = '1:';
County_Tax['Boulder:'+COTY] = '1.185::RTD=1:CD=0.1'; // 2023 change
County_Tax['Broomfield:'+COTY] = '0::CD=0.1'; // 2019 change
County_Tax['Chaffee:'+COTY] = '2.75:'; // 2019 change
County_Tax['Cheyenne:'+COTY] = '0:';
County_Tax['Clear Creek:'+COTY] = '2.65:'; // 2023 change
County_Tax['Conejos:'+COTY] = '2:'; // 2023 change
County_Tax['Costilla:'+COTY] = '2:'; // 2023 change
County_Tax['Crowley:'+COTY] = '2:';
County_Tax['Custer:'+COTY] = '2:';
County_Tax['Delta:'+COTY] = '2::PSI=0.8:HSD=0.8'; // 2022 change
County_Tax['Denver:'+COTY] = '0::RTD=1:'; // 2019 change
County_Tax['Dolores:'+COTY] = '0:';
County_Tax['Douglas:'+COTY] = '1::RTD=1:CD=0.1:';
County_Tax['Eagle:'+COTY] = '1::MTS=0.5';
County_Tax['Elbert:'+COTY] = '1::';
County_Tax['El Paso:'+COTY] = '1.23::RTA=1';
County_Tax['Fremont:'+COTY] = '2.5:';
County_Tax['Garfield:'+COTY] = '1:';
County_Tax['Gilpin:'+COTY] = '0:';
County_Tax['Grand:'+COTY] = '1.3:'; // 2017 change
County_Tax['Gunnison:'+COTY] = '1::RTA=1';
County_Tax['Hinsdale:'+COTY] = '5:';
County_Tax['Huerfano:'+COTY] = '3:'; // 2023 change
County_Tax['Jackson:'+COTY] = '4:';
County_Tax['Jefferson:'+COTY] = '0.5:B:RTD=1:CD=0.1';
County_Tax['Kiowa:'+COTY] = '0:';
County_Tax['Kit Carson:'+COTY] = '0:';
County_Tax['Lake:'+COTY] = '4:';
County_Tax['La Plata:'+COTY] = '2:';
County_Tax['Las Animas:'+COTY] = '1.5:'; // 2018 change
County_Tax['Larimer:'+COTY] = '0.8::'; // 2019 change
County_Tax['Lincoln:'+COTY] = '2:';
County_Tax['Logan:'+COTY] = '1:';
County_Tax['Mesa:'+COTY] = '2::PSI=0.37';
County_Tax['Mineral:'+COTY] = '2::HSD=0.6';
County_Tax['Moffat:'+COTY] = '2:';
County_Tax['Montezuma:'+COTY] = '0::HSD=0.4';
County_Tax['Montrose:'+COTY] = '1::PSI=0.75';
County_Tax['Morgan:'+COTY] = '0:';
County_Tax['Otero:'+COTY] = '1:';
County_Tax['Ouray:'+COTY] = '2.55:'; // 2021 change
County_Tax['Park:'+COTY] = '1:';
County_Tax['Phillips:'+COTY] = '1:';
County_Tax['Pitkin:'+COTY] = '3.1:::MTS=0.5';
County_Tax['Prowers:'+COTY] = '1:';
County_Tax['Pueblo:'+COTY] = '1::';
County_Tax['Rio Blanco:'+COTY] = '3.6:';
County_Tax['Rio Grande:'+COTY] = '2::HSD=0.6';
County_Tax['Routt:'+COTY] = '1:';
County_Tax['Saguache:'+COTY] = '2.5:'; // 2019 change
County_Tax['San Juan:'+COTY] = '6.5:'; // 2018 change
County_Tax['San Miguel:'+COTY] = '1::RTA=0.25:'; // 2019 change
County_Tax['Sedgwick:'+COTY] = '3:'; // 2020 change
County_Tax['Summit:'+COTY] = '2::MHA=0.725:MTS=0.75'; // 2023 change
County_Tax['Teller:'+COTY] = '1:';
County_Tax['Washington:'+COTY] = '1.5:';
County_Tax['Weld:'+COTY] = '0:';
County_Tax['Yuma:'+COTY] = '0:';

// Regions with special taxes only
City_Tax['Arrowhead:'+COTY] = '0::MDT=5.0::'; // 2020 add
City_Tax['Aspen Park:'+COTY] = '0::MDT=0.5:AP=0.25:';
City_Tax['Bachelor Gulch:'+COTY] = '0::MDT=5.0::'; // Added 2018
City_Tax['Buffalo Mountain:'+COTY] = '0::MDT=4.0::'; // Added 2021
City_Tax['Conifer:'+COTY] = '0::MDT=0.75::'; // added 2021
City_Tax['Eagle-Vail:'+COTY] = '0::MDT=1::';
City_Tax['Edwards:'+COTY] = '0::MDT=1::';
City_Tax['Mt. Vernon CC:'+COTY] = '0::MDT=2::'; // Added 2018
City_Tax['Ohio:'+COTY] = '0::RTA=0::';
City_Tax['Red Sky Ranch:'+COTY] = '0::MDT=5.5::'; // added 2018
City_Tax['SE Jefferson County:'+COTY] = '0:B:SE=0.5::';
City_Tax['Somerset:'+COTY] = '0::RTA=0::';
City_Tax['South Park:'+COTY] = '0::HSD=1:'; // Added 2018
City_Tax['Southwest Plaza:'+COTY] = '3:B:MDT=1.5::'; // Added 2021
City_Tax['Two Rivers:'+COTY] = '0::MDT=4::';
City_Tax['Ute Pass/Douglas:'+COTY] = '0::HSD=0.5'; // New 2023
City_Tax['Ute Pass/Park:'+COTY] = '0::HSD=0.5'; // New 2023
City_Tax['Ute Pass/Teller:'+COTY] = '0::HSD=0.5'; // New 2023

// State-Collected City Sales Taxes
City_Tax['Aguilar:'+COTY] = '3::::';
City_Tax['Akron:'+COTY] = '2.5::::';
City_Tax['Alamosa:'+COTY] = '2.5::::'; // 2020 change
City_Tax['Alma:'+COTY] = '3::::';
City_Tax['Antonito:'+COTY] = '4::::';
City_Tax['Ault:'+COTY] = '3::::';
City_Tax['Basalt/Eagle:'+COTY] = '3::RTA=0.8::';
City_Tax['Basalt/Pitkin:'+COTY] = '3::RTA=0.8::';
City_Tax['Bayfield:'+COTY] = '3::::';
City_Tax['Bennett/Adams:'+COTY] = '4::::';
City_Tax['Bennett/Arapahoe:'+COTY] = '4::::';
City_Tax['Berthoud/Larimer:'+COTY] = '4::::'; // 2019 change
City_Tax['Berthoud/Weld:'+COTY] = '4::::'; // 2019 change
City_Tax['Blanca:'+COTY] = '3::::';
City_Tax['Blue River:'+COTY] = '2.5::MTS=0.75::';
City_Tax['Brush:'+COTY] = '4::::';
City_Tax['Buena Vista:'+COTY] = '2.5::::';
City_Tax['Burlington:'+COTY] = '3::::'; // 2023 change
City_Tax['Calhan:'+COTY] = '3::RTA=0::';
City_Tax['Canon City:'+COTY] = '3::::'; // 2017 change
City_Tax['Cedaredge:'+COTY] = '2::::';
City_Tax['Center/Rio Grande:'+COTY] = '4::::'; // 2020 change
City_Tax['Center/Saguache:'+COTY] = '4::::'; // 2020 change
City_Tax['Cheyenne Wells:'+COTY] = '2::::';
City_Tax['Cokedale:'+COTY] = '1::::'; // Added 2021
City_Tax['Collbran:'+COTY] = '2::::';
City_Tax['Columbine Valley:'+COTY] = '3::::';
City_Tax['Crawford:'+COTY] = '2::::';
City_Tax['Creede:'+COTY] = '4::::'; // 2020 change
City_Tax['Crestone:'+COTY] = '3.5::::'; // 2020 change
City_Tax['Cripple Creek:'+COTY] = '2.3::::';
City_Tax['De Beque:'+COTY] = '2::::';
City_Tax['Del Norte:'+COTY] = '2::::';
City_Tax['Dillon:'+COTY] = '2.5::MTS=0.75::';
City_Tax['Dinosaur:'+COTY] = '2.1::::';
City_Tax['Dolores:'+COTY] = '3.5::::';
City_Tax['Dove Creek:'+COTY] = '2::::';
City_Tax['Eads:'+COTY] = '2::::';
City_Tax['Eagle:'+COTY] = '4.5::::';
City_Tax['Eaton:'+COTY] = '3::::';
City_Tax['Eckley:'+COTY] = '2.1::::'; // Added 2021
City_Tax['Elizabeth:'+COTY] = '4::::';
City_Tax['Empire:'+COTY] = '5::::';
City_Tax['Erie/Boulder:'+COTY] = '3.5::::';
City_Tax['Erie/Weld:'+COTY] = '3.5::RTD=1::';
City_Tax['Estes Park:'+COTY] = '5::::';
City_Tax['Fairplay:'+COTY] = '4::::';
City_Tax['Firestone:'+COTY] = '3.6::::'; // 2018 change
City_Tax['Flagler:'+COTY] = '2::::';
City_Tax['Fleming:'+COTY] = '2::::';
City_Tax['Florence:'+COTY] = '2.5::::';
City_Tax['Fort Lupton:'+COTY] = '4::::';
City_Tax['Fort Morgan:'+COTY] = '4::::'; // 2018 change
City_Tax['Fountain:'+COTY] = '3.4::RTA=0::'; // 2021 change
City_Tax['Fowler:'+COTY] = '3::::';
City_Tax['Foxfield:'+COTY] = '3.75::::';
City_Tax['Fraser:'+COTY] = '5::::';
City_Tax['Frederick:'+COTY] = '3.5::::'; // 2021 change
City_Tax['Fruita:'+COTY] = '3::::';
City_Tax['Garden City:'+COTY] = '3::::';
City_Tax['Georgetown:'+COTY] = '4.5::::'; // 2019 change
City_Tax['Gilcrest:'+COTY] = '4::::';
City_Tax['Granada:'+COTY] = '2::::';
City_Tax['Granby:'+COTY] = '4::::';
City_Tax['Grand Lake:'+COTY] = '5::::'; // 2017 change
City_Tax['Green Mt Falls/El Paso:'+COTY] = '3::::';
City_Tax['Green Mt Falls/Teller:'+COTY] = '3::::';
City_Tax['Grover:'+COTY] = '1::::';
City_Tax['Haxtun:'+COTY] = '3.5::::'; // 2018 change
City_Tax['Hayden:'+COTY] = '5::::'; // 2021 change
City_Tax['Holly:'+COTY] = '3::::';
City_Tax['Holyoke:'+COTY] = '1.5::::';
City_Tax['Hooper:'+COTY] = '2::::';
City_Tax['Hot Sulphur Springs:'+COTY] = '4::::';
City_Tax['Hotchkiss:'+COTY] = '2::::';
City_Tax['Hudson:'+COTY] = '4::::';
City_Tax['Hugo:'+COTY] = '2::::';
City_Tax['Idaho Springs:'+COTY] = '4::::';
City_Tax['Ignacio:'+COTY] = '3::::'; // 2021 change
City_Tax['Johnstown/Larimer:'+COTY] = '3.5::::'; // 2020 change
City_Tax['Johnstown/Weld:'+COTY] = '3.5::::'; // 2020 change
City_Tax['Julesburg:'+COTY] = '2.3::::'; // 2023 change
City_Tax['Keenesburg:'+COTY] = '3::::';
City_Tax['Kersey:'+COTY] = '3.6::::';
City_Tax['Kiowa:'+COTY] = '1.5::::';
City_Tax['Kit Carson:'+COTY] = '2::::';
City_Tax['Kremmling:'+COTY] = '4::::';
City_Tax['Lakeside:'+COTY] = '2.8::::'; // 2021 change
City_Tax['La Jara:'+COTY] = '3::::';
City_Tax['La Junta:'+COTY] = '3::HSD=1::'; // HSD added 2018
City_Tax['La Salle:'+COTY] = '3.5::::';
City_Tax['La Veta:'+COTY] = '3.5::::';
City_Tax['Larkspur:'+COTY] = '4::CD=0::';
City_Tax['Las Animas:'+COTY] = '4::::'; // 2023 change
City_Tax['Limon:'+COTY] = '2.75::::'; // 2021 change
City_Tax['Lochbuie/Adams:'+COTY] = '4::::';
City_Tax['Lochbuie/Weld:'+COTY] = '4::::';
City_Tax['Log Lane Village:'+COTY] = '3::::';
City_Tax['Lyons:'+COTY] = '3.5::::';
City_Tax['Manassa:'+COTY] = '1::::';
City_Tax['Mancos:'+COTY] = '4::::';
City_Tax['Manitou Springs:'+COTY] = '3.9::::'; // 2019 change
City_Tax['Manzanola/Crowley:'+COTY] = '2::::';
City_Tax['Manzanola/Otero:'+COTY] = '2::::';
City_Tax['Marble:'+COTY] = '4::RTA=0::'; // 2021 change
City_Tax['Mead:'+COTY] = '3::::'; // 2023 change
City_Tax['Milliken:'+COTY] = '2.5::::';
City_Tax['Minturn:'+COTY] = '4::::'; // 2019 change
City_Tax['Moffat:'+COTY] = '2::::';
City_Tax['Monte Vista:'+COTY] = '3::::'; // 2021 change
City_Tax['Montezuma:'+COTY] = '2::HSD=0.4::'; // 2023 change
City_Tax['Monument:'+COTY] = '3.5::RTA=0::'; // 2023 change
City_Tax['Monument-Baptist Rd:'+COTY] = '3.5::RTA=0::'; // 2023 change
City_Tax['Morrison:'+COTY] = '3.75::::';
City_Tax['Mountain View:'+COTY] = '4::::';
City_Tax['Naturita:'+COTY] = '4::::';
City_Tax['Nederland:'+COTY] = '4::::'; // 2021 change
City_Tax['New Castle:'+COTY] = '3.5::RTA=0.8::';
City_Tax['Norwood:'+COTY] = '3::::';
City_Tax['Nucla:'+COTY] = '4::::';
City_Tax['Nunn:'+COTY] = '2::::';
City_Tax['Oak Creek:'+COTY] = '3::::';
City_Tax['Olathe:'+COTY] = '4::::';
City_Tax['Ophir:'+COTY] = '2::RTA=0::'; // added in 2021
City_Tax['Ordway:'+COTY] = '2::::';
City_Tax['Otis:'+COTY] = '2::::';
City_Tax['Ouray:'+COTY] = '4::::';
City_Tax['Ovid:'+COTY] = '1::::';
City_Tax['Palisade:'+COTY] = '2::::';
City_Tax['Palmer Lake:'+COTY] = '3::RTA=0::';
City_Tax['Paonia:'+COTY] = '3::::'; // 2021 change
City_Tax['Parachute:'+COTY] = '3.75::::';
City_Tax['Pierce:'+COTY] = '2::::';
City_Tax['Pitkin:'+COTY] = '3::RTA=0::';
City_Tax['Platteville:'+COTY] = '3::::';
City_Tax['Poncha Springs:'+COTY] = '2::::';
City_Tax['Ramah:'+COTY] = '2::::';
City_Tax['Red Cliff:'+COTY] = '3::::';
City_Tax['Rico:'+COTY] = '5::RTA=0.25::'; // Added 2020
City_Tax['Rocky Ford:'+COTY] = '4::::'; // 2017 change, 2018 change
City_Tax['Romeo:'+COTY] = '1::::';
City_Tax['Saguache:'+COTY] = '4::::';
City_Tax['Salida:'+COTY] = '3::::';
City_Tax['San Luis:'+COTY] = '3::::';
City_Tax['Sawpit:'+COTY] = '3::RTA=0::';
City_Tax['Sedgwick:'+COTY] = '1::::';
City_Tax['Seibert:'+COTY] = '2::::';
City_Tax['Severance:'+COTY] = '3::::';
City_Tax['Silt:'+COTY] = '3::::';
City_Tax['Silver Cliff:'+COTY] = '3::::'; // 2021 change
City_Tax['Silver Plume:'+COTY] = '3::::';
City_Tax['Silverton:'+COTY] = '1::::';
City_Tax['Simla:'+COTY] = '4::::';
City_Tax['South Fork/Mineral:'+COTY] = '2::::';
City_Tax['South Fork/Rio Grande:'+COTY] = '2::::';
City_Tax['Springfield:'+COTY] = '2::::';
City_Tax['Stratton:'+COTY] = '2::::';
City_Tax['Superior/Boulder:'+COTY] = '3.46::::';
City_Tax['Superior/Jefferson:'+COTY] = '3.46::::';
City_Tax['Trinidad:'+COTY] = '4::::';
City_Tax['Victor:'+COTY] = '3::::';
City_Tax['Walden:'+COTY] = '1::::';
City_Tax['Walsenburg:'+COTY] = '3::::';
City_Tax['Walsh:'+COTY] = '3::::';
City_Tax['Ward:'+COTY] = '2::::';
City_Tax['Wellington:'+COTY] = '3::::';
City_Tax['Westcliffe:'+COTY] = '3::::'; // 2020 change
City_Tax['Wiggins:'+COTY] = '2::::';
City_Tax['Wiley:'+COTY] = '2::::';
City_Tax['Wray:'+COTY] = '2.5::::';
City_Tax['Yampa:'+COTY] = '2::::';
City_Tax['Yuma:'+COTY] = '3::::';

// Home Rule Cities
City_Tax['Arvada/Adams:'+COTY] = '3.46:B::';
City_Tax['Arvada/Jefferson:'+COTY] = '3.46:B::';
City_Tax['Aspen:'+COTY] = '2.4::RTA=0.4::'; // 2019 change
City_Tax['Aurora/Adams:'+COTY] = '3.75:::';
City_Tax['Aurora/Arapahoe:'+COTY] = '3.75:::';
City_Tax['Aurora/Douglas:'+COTY] = '3.75:::::';
City_Tax['Avon:'+COTY] = '4::::';
City_Tax['Black Hawk:'+COTY] = '6::::'; // 2017 change
City_Tax['Boulder:'+COTY] = '3.86:B::';
City_Tax['Breckenridge:'+COTY] = '2.5::MTS=0.75::';
City_Tax['Brighton/Adams:'+COTY] = '3.75::::';
City_Tax['Brighton/Weld:'+COTY] = '3.75::::';
City_Tax['Broomfield:'+COTY] = '4.15::RTD=1:CD=0.1::';
City_Tax['Carbondale:'+COTY] = '3.5::RTA=1::';
City_Tax['Castle Pines:'+COTY] = '2.75::::';
City_Tax['Castle Rock:'+COTY] = '4::RTD=0:CD=0:';
City_Tax['Centennial:'+COTY] = '2.5:A:::';
City_Tax['Central City:'+COTY] = '6::::'; // 2019 change
City_Tax['Cherry Hills Village:'+COTY] = '3.5::::';
City_Tax['Colorado Springs:'+COTY] = '3.07::::'; // 2021 change
City_Tax['Commerce City:'+COTY] = '4.5::::';
City_Tax['Cortez:'+COTY] = '4.05::::';
City_Tax['Craig:'+COTY] = '4::::'; // 2021 change
City_Tax['Crested Butte:'+COTY] = '4.5::::';
City_Tax['Dacono:'+COTY] = '3::::';
City_Tax['Delta:'+COTY] = '3::::';
City_Tax['Denver:'+COTY] = '4.81::RTD=1:CD=0.1:'; // 2019 change
City_Tax['Durango:'+COTY] = '3.5::::'; // 2019 change
City_Tax['Edgewater:'+COTY] = '3.5::::';
City_Tax['Englewood:'+COTY] = '3.5::::';
City_Tax['Evans:'+COTY] = '4.5::::'; // 2021 change
City_Tax['Federal Heights:'+COTY] = '4::::';
City_Tax['Fort Collins:'+COTY] = '3.85:B::';
City_Tax['Frisco:'+COTY] = '2::MTS=0.75::';
City_Tax['Glendale:'+COTY] = '3.75::::';
City_Tax['Glenwood Springs:'+COTY] = '3.7::RTA=1::';
City_Tax['Golden:'+COTY] = '3::::';
City_Tax['Grand Junction:'+COTY] = '3.25::::'; // 2023 change
City_Tax['Greeley:'+COTY] = '4.11:B::';
City_Tax['Greenwood Village:'+COTY] = '3::::';
City_Tax['Gunnison:'+COTY] = '4::::';
City_Tax['Gypsum:'+COTY] = '3::::';
City_Tax['Lafayette:'+COTY] = '3.87::::'; // 2023 change
City_Tax['Lakewood:'+COTY] = '3:A::';
City_Tax['Lamar:'+COTY] = '3::::';
City_Tax['Littleton/Arapahoe:'+COTY] = '3.75::::'; // 2023 change
City_Tax['Littleton/Douglas:'+COTY] = '3.75::::'; // 2023 change
City_Tax['Littleton/Jefferson:'+COTY] = '3.75:B:::'; // 2023 change
City_Tax['Lone Tree:'+COTY] = '1.8125::RTD=1::';
City_Tax['Longmont/Boulder:'+COTY] = '3.53:B::'; // 2018 change
City_Tax['Longmont/Larimer:'+COTY] = '3.53:B:::'; // 2018 change
City_Tax['Longmont/Weld:'+COTY] = '3.53:B:::'; // 2018 change
City_Tax['Louisville:'+COTY] = '3.65::::'; // 2018 change
City_Tax['Loveland:'+COTY] = '3::::';
City_Tax['Montrose:'+COTY] = '3.88::::'; // 2021 change
City_Tax['Mt. Crested Butte:'+COTY] = '5::::';
City_Tax['Mountain Village:'+COTY] = '4.5::RTA=0.25::'; // 2019 change
City_Tax['Northglenn/Adams:'+COTY] = '4::::';
City_Tax['Northglenn/Weld:'+COTY] = '4::::';
City_Tax['Parker:'+COTY] = '3::::';
City_Tax['Pueblo:'+COTY] = '3.7::::'; // 2018 change
City_Tax['Pueblo West:'+COTY] = '3.7::MDT=1.0::'; // added 2021
City_Tax['Ridgway:'+COTY] = '3.6::::';
City_Tax['Rifle:'+COTY] = '4.25::::';
City_Tax['Sheridan:'+COTY] = '3.5::::';
City_Tax['Silverthorne:'+COTY] = '2::::';
City_Tax['Snowmass Village:'+COTY] = '3.5::RTA=0.4::';
City_Tax['Steamboat Springs:'+COTY] = '4.5::::'; // 2017 change
City_Tax['Sterling:'+COTY] = '3::RTA=0.1::';
City_Tax['Telluride:'+COTY] = '4.5::RTA=0.25::'; // 2019 change
City_Tax['Thornton:'+COTY] = '3.75:B::';
City_Tax['Timnath:'+COTY] = '3::::';
City_Tax['Vail:'+COTY] = '4.5::::'; // 2023 change
City_Tax['Westminster/Adams:'+COTY] = '3.85:B::';
City_Tax['Westminster/Jefferson:'+COTY] = '3.85:B::';
City_Tax['Wheat Ridge:'+COTY] = '3.5::::'; // 2017 change
City_Tax['Windsor/Larimer:'+COTY] = '3.95::::';
City_Tax['Windsor/Weld:'+COTY] = '3.95::::';
City_Tax['Winter Park:'+COTY] = '7::::';
City_Tax['Woodland Park/El Paso:'+COTY] = '4.09::::';
City_Tax['Woodland Park/Teller:'+COTY] = '4.09::::';
