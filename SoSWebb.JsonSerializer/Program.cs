using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoSWebb.JsonSerializer
{
    class Program
    {
        static void Main(string[] args)
        {
            var areaList = createAreas();
            var areaList2 = new List<Area2>();
            areaList2.Add(createAreaWithSubareaInsatser_Area1());
            areaList2.Add(createAreaWithSubareaInsatser_Area2());
            areaList2.Add(createAreaWithSubareaInsatser_Area3());
            areaList2.Add(createAreaWithSubareaInsatser_Area4());
            areaList2.Add(createAreaWithSubareaInsatser_Area5());
            areaList2.Add(createAreaWithSubareaInsatser_Area6());

            var settings = new JsonSerializerSettings();
            settings.ContractResolver = new LowercaseContractResolver();
            var json = JsonConvert.SerializeObject(areaList, Formatting.Indented, settings);
            var json2 = JsonConvert.SerializeObject(areaList2, Formatting.Indented, settings);

            File.WriteAllText(@"C:\dev\SoSWebb\SoSWebb.JsonSerializer\json\data.json", json);
            File.WriteAllText(@"C:\dev\SoSWebb\SoSWebb.JsonSerializer\json\data2.json", json2);

        }

        //create areas and subareas with resp. "insatser"  
        private static Area2 createAreaWithSubareaInsatser_Area1()
        {
            Area2 area = new Area2();
            area.Area = "Bedömningsinstrument";
            List<Subarea2> subareaListWithInsatser = new List<Subarea2>();
            subareaListWithInsatser.Add(createInsatser_Subarea1());
            subareaListWithInsatser.Add(createInsatser_Subarea2());
            subareaListWithInsatser.Add(createInsatser_Subarea3());
            subareaListWithInsatser.Add(createInsatser_Subarea4());
            area.Subareas = subareaListWithInsatser;

            return area;
        }
        private static Area2 createAreaWithSubareaInsatser_Area2()
        {
            Area2 area = new Area2();
            area.Area = "Medicinska test";
            List<Subarea2> subareaListWithInsatser = new List<Subarea2>();
            subareaListWithInsatser.Add(createInsatser_Subarea5());
            subareaListWithInsatser.Add(createInsatser_Subarea6());
            subareaListWithInsatser.Add(createInsatser_Subarea7());
            area.Subareas = subareaListWithInsatser;

            return area;
        }
        private static Area2 createAreaWithSubareaInsatser_Area3()
        {
            Area2 area = new Area2();
            area.Area = "Psykologisk och psykosocial behandling";
            List<Subarea2> subareaListWithInsatser = new List<Subarea2>();
            subareaListWithInsatser.Add(createInsatser_Subarea8());
            subareaListWithInsatser.Add(createInsatser_Subarea9());
            subareaListWithInsatser.Add(createInsatser_Subarea10());
            subareaListWithInsatser.Add(createInsatser_Subarea11());
            subareaListWithInsatser.Add(createInsatser_Subarea12());
            subareaListWithInsatser.Add(createInsatser_Subarea13());
            area.Subareas = subareaListWithInsatser;

            return area;
        }
        private static Area2 createAreaWithSubareaInsatser_Area4()
        {
            Area2 area = new Area2();
            area.Area = "Psykosociala stödinsatser";
            List<Subarea2> subareaListWithInsatser = new List<Subarea2>();
            subareaListWithInsatser.Add(createInsatser_Subarea14());
            subareaListWithInsatser.Add(createInsatser_Subarea15());
            subareaListWithInsatser.Add(createInsatser_Subarea16());
            subareaListWithInsatser.Add(createInsatser_Subarea17());
            subareaListWithInsatser.Add(createInsatser_Subarea18());
            subareaListWithInsatser.Add(createInsatser_Subarea19());
            area.Subareas = subareaListWithInsatser;
            return area;
        }
        private static Area2 createAreaWithSubareaInsatser_Area5()
        {
            Area2 area = new Area2();
            area.Area = "Behandling vid samsjuklighet";
            List<Subarea2> subareaListWithInsatser = new List<Subarea2>();
            subareaListWithInsatser.Add(createInsatser_Subarea20());
            subareaListWithInsatser.Add(createInsatser_Subarea21());
            area.Subareas = subareaListWithInsatser;
            return area;
        }
        private static Area2 createAreaWithSubareaInsatser_Area6()
        {
            Area2 area = new Area2();
            area.Area = "Psykologisk och psykosocial behandling för ungdomar";
            List<Subarea2> subareaListWithInsatser = new List<Subarea2>();
            subareaListWithInsatser.Add(createInsatser_Subarea22());
            subareaListWithInsatser.Add(createInsatser_Subarea23());
            area.Subareas = subareaListWithInsatser;
            return area;
        }

        //create the list of "insatser" in every subarea
        //Bedomninginstrument
        private static Subarea2 createInsatser_Subarea1()
        {
            Subarea2 subarea1 = new Subarea2();
            subarea1.Title = "Identifiering av alkohol- och narkotikaproblem";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "AUDIT (alkoholproblem)";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "DUDIT (narkotikaproblem)";


            Insatsen insats3 = new Insatsen();
            insats3.Title = "DUDIT-E (narkotikaproblem)";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            insatsList.Add(insats3);
            subarea1.insatslist = insatsList;

            return subarea1;
        }
        private static Subarea2 createInsatser_Subarea2()
        {
            Subarea2 subarea2 = new Subarea2();
            subarea2.Title = "Diagnostik av skadligt bruk, missbruk eller beroende";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "ADDIS";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "SCID I";

            Insatsen insats3 = new Insatsen();
            insats3.Title = "MINI";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            insatsList.Add(insats3);
            subarea2.insatslist = insatsList;

            return subarea2;
        }
        private static Subarea2 createInsatser_Subarea3()
        {
            Subarea2 subarea3 = new Subarea2();
            subarea3.Title = "Bedömning av hjälpbehov";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "ASI";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "DOK";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            subarea3.insatslist = insatsList;

            return subarea3;
        }
        private static Subarea2 createInsatser_Subarea4()
        {
            Subarea2 subarea4 = new Subarea2();
            subarea4.Title = "Bedömning av hjälpbehov för ungdomar";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "ADAD";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            subarea4.insatslist = insatsList;

            return subarea4;
        }

        //Medicinska test
        private static Subarea2 createInsatser_Subarea5()
        {
            Subarea2 subarea5 = new Subarea2();
            subarea5.Title = "Nyligt intag av alkohol";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "EtG eller EtS i urin";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "Mätning av alkoholhalten i urin";


            Insatsen insats3 = new Insatsen();
            insats3.Title = "Matning av alkoholhalten i utandningsluft";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            insatsList.Add(insats3);
            subarea5.insatslist = insatsList;

            return subarea5;
        }
        private static Subarea2 createInsatser_Subarea6()
        {
            Subarea2 subarea6 = new Subarea2();
            subarea6.Title = "Långvarigt högt intag av alkohol";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Mätning av CDT eller PEth i blodprov";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "Mätning av GT i blodprov";

            Insatsen insats3 = new Insatsen();
            insats3.Title = "Mätning av ASAT och ALAT i blodprov";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            insatsList.Add(insats3);
            subarea6.insatslist = insatsList;

            return subarea6;
        }
        private static Subarea2 createInsatser_Subarea7()
        {
            Subarea2 subarea7 = new Subarea2();
            subarea7.Title = "Pågående eller nyligt intag av narkotika";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Urinprov";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "Patientnära drogtest (snabbtest) med urinprov";


            Insatsen insats3 = new Insatsen();
            insats3.Title = "Salivprov";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            insatsList.Add(insats3);
            subarea7.insatslist = insatsList;

            return subarea7;
        }

        //Psykologisk och psykosocial behandling
        private static Subarea2 createInsatser_Subarea8()
        {
            Subarea2 subarea8 = new Subarea2();
            subarea8.Title = "Missbruk eller beroende av alkohol";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Motivationshöjande behandling (MET)";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "Kognitiv beteendeterapi (KBT)";

            Insatsen insats3 = new Insatsen();
            insats3.Title = "Återfallsprevention (ÅP)";

            Insatsen insats4 = new Insatsen();
            insats4.Title = "Community reinforcement approach (CRA)";

            Insatsen insats5 = new Insatsen();
            insats5.Title = "12-stegsbehandling";

            Insatsen insats6 = new Insatsen();
            insats6.Title = "Social behaviour network therapy (SBNT)";

            Insatsen insats7 = new Insatsen();
            insats7.Title = "Psykodynamisk terapi";

            Insatsen insats8 = new Insatsen();
            insats8.Title = "Interaktionell terapi";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            insatsList.Add(insats3);
            insatsList.Add(insats4);
            insatsList.Add(insats5);
            insatsList.Add(insats6);
            insatsList.Add(insats7);
            insatsList.Add(insats8);
            subarea8.insatslist = insatsList;

            return subarea8;
        }
        private static Subarea2 createInsatser_Subarea9()
        {
            Subarea2 subarea9 = new Subarea2();
            subarea9.Title = "Långvarigt bruk av bensodiazepiner";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Kognitiv beteendeterapi (KBT) (1)(2)";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "Återfallsprevention (ÅP) (1)(2)";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);

            subarea9.insatslist = insatsList;

            return subarea9;
        }
        private static Subarea2 createInsatser_Subarea10()
        {
            Subarea2 subarea10 = new Subarea2();
            subarea10.Title = "Missbruk eller beroende av cannabis";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Kognitiv beteendeterapi (KBT) + MI/MET";


            Insatsen insats2 = new Insatsen();
            insats2.Title = "Återfallsprevention (ÅP) + MI/MET";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);

            subarea10.insatslist = insatsList;

            return subarea10;
        }
        private static Subarea2 createInsatser_Subarea11()
        {
            Subarea2 subarea11 = new Subarea2();
            subarea11.Title = "Missbruk eller beroende av centralstimulantia";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "MATRIX-programmet";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "12-stegsbehandling";

            Insatsen insats3 = new Insatsen();
            insats3.Title = "Community reinforcement approach (CRA)";

            Insatsen insats4 = new Insatsen();
            insats4.Title = "Kognitiv beteendeterapi (KBT)";

            Insatsen insats5 = new Insatsen();
            insats5.Title = "Återfallsprevention (ÅP)";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            insatsList.Add(insats3);
            insatsList.Add(insats4);
            insatsList.Add(insats5);

            subarea11.insatslist = insatsList;

            return subarea11;
        }
        private static Subarea2 createInsatser_Subarea12()
        {
            Subarea2 subarea12 = new Subarea2();
            subarea12.Title = "Missbruk eller beroende av opiater";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Kognitiv beteendeterapi (KBT) (2)";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "Återfallsprevention (ÅP) (2)";

            Insatsen insats3 = new Insatsen();
            insats3.Title = "Community reinforcement approach (CRA) (2)";

            Insatsen insats4 = new Insatsen();
            insats4.Title = "Psykodynamisk terapi (2)";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            insatsList.Add(insats3);
            insatsList.Add(insats4);

            subarea12.insatslist = insatsList;

            return subarea12;
        }
        private static Subarea2 createInsatser_Subarea13()
        {
            Subarea2 subarea13 = new Subarea2();
            subarea13.Title = "Nätverks-/parterapi vid alkohol- eller narkotikaproblem";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Parterapi (2)";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "Nätverksterapi (2)";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);

            subarea13.insatslist = insatsList;

            return subarea13;
        }

        //Psykosociala stödinsatser
        private static Subarea2 createInsatser_Subarea14()
        {
            Subarea2 subarea14 = new Subarea2();
            subarea14.Title = "Arbetslivsinriktad rehabilitering";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Arbetslivsinriktad rehabilitering enligt IPS";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "Arbetsförberedande träningsmodeller";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            subarea14.insatslist = insatsList;

            return subarea14;
        }
        private static Subarea2 createInsatser_Subarea15()
        {
            Subarea2 subarea15 = new Subarea2();
            subarea15.Title = "Boendestöd";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Personellt boendestöd";


            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);

            subarea15.insatslist = insatsList;

            return subarea15;
        }
        private static Subarea2 createInsatser_Subarea16()
        {

            Subarea2 subarea16 = new Subarea2();
            subarea16.Title = "Boendeinsatser vid hemlöshet";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Vårdkedja";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "Bostad först";

            Insatsen insats3 = new Insatsen();
            insats3.Title = "Boendetrappa (3)";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            insatsList.Add(insats3);

            subarea16.insatslist = insatsList;

            return subarea16;
        }
        private static Subarea2 createInsatser_Subarea17()
        {
            Subarea2 subarea17 = new Subarea2();
            subarea17.Title = "Samordning av vård-och stödinsatser";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Individuell case management - strengths model";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);    
            subarea17.insatslist = insatsList;

            return subarea17;
        }
        private static Subarea2 createInsatser_Subarea18()
        {

            Subarea2 subarea18 = new Subarea2();
            subarea18.Title = "Psykosocialt stöd till vuxna anhöriga";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Al- eller Nar-anon-inspirerade stödprogram";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "Coping skills training";


            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);

            subarea18.insatslist = insatsList;

            return subarea18;
        }
        private static Subarea2 createInsatser_Subarea19()
        {

            Subarea2 subarea19 = new Subarea2();
            subarea19.Title = "Stöd till anhöriga som vill motivera narstående till behandling";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Community reinforcement approach and family traning (CRAFT)";

            Insatsen insats2 = new Insatsen();
            insats2.Title = "ARISE (1)";


            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);

            subarea19.insatslist = insatsList;

            return subarea19;
        }

        //Behandling vid samsjuklighet
        private static Subarea2 createInsatser_Subarea20()
        {
            Subarea2 subarea20 = new Subarea2();
            subarea20.Title = "Integrerad behandlingsmetod vid samsjuklighet";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "KBT med eller utan tillägg av motiverande samtal.";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);

            subarea20.insatslist = insatsList;

            return subarea20;
        }
        private static Subarea2 createInsatser_Subarea21()
        {

            Subarea2 subarea21 = new Subarea2();
            subarea21.Title = "Samordning av vårdinsatser vid samsjuklighet";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Case management i form av integrerade eller samverkande team";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            subarea21.insatslist = insatsList;

            return subarea21;
        }

        //Ungdomar
        private static Subarea2 createInsatser_Subarea22()
        {
            Subarea2 subarea22 = new Subarea2();
            subarea22.Title = "Korta insatser (BI) för ungdomar";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Motivationshöjande behandling (MET)";
            Insatsen insats2 = new Insatsen();
            insats2.Title = "Motivationshöjande behandling (MET) + Kog-nitiv beteendeterapi (KBT)";
            Insatsen insats3 = new Insatsen();
            insats3.Title = "Adolescent community reinforcement approach (ACRA) ";
            Insatsen insats4 = new Insatsen();
            insats4.Title = "Assertive continuing care (ACC)";
            Insatsen insats5 = new Insatsen();
            insats5.Title = "Hash avvänjningsprogrammet (HAP) (1)";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            insatsList.Add(insats3);
            insatsList.Add(insats4);
            insatsList.Add(insats5);
            subarea22.insatslist = insatsList;

            return subarea22;
        }
        private static Subarea2 createInsatser_Subarea23()
        {

            Subarea2 subarea23 = new Subarea2();
            subarea23.Title = "Familjeinterventioner för ungdomar";

            Insatsen insats1 = new Insatsen();
            insats1.Title = "Functional family treatment (FFT)";
            Insatsen insats2 = new Insatsen();
            insats2.Title = "Multidimensional family therapy (MDFT)";
            Insatsen insats3 = new Insatsen();
            insats3.Title = "Brief strategic family treatment (BSFT)";
            Insatsen insats4 = new Insatsen();
            insats4.Title = "Multisystemisk terapi (MST)";

            List<Insatsen> insatsList = new List<Insatsen>();
            insatsList.Add(insats1);
            insatsList.Add(insats2);
            insatsList.Add(insats3);
            insatsList.Add(insats4);
            subarea23.insatslist = insatsList;

            return subarea23;
        }


        //Steg A data
        private static List<Area> createAreas()
        {
            Area area1 = new Area();
            area1.Id = 1;
            area1.Title = "Bedömningsinstrument";

            Subarea bedomningsinstrument_subarea1 = new Subarea();
            bedomningsinstrument_subarea1.Id = 1;
            bedomningsinstrument_subarea1.Title = "Identifiering av alkohol- och narkotika problem";
            bedomningsinstrument_subarea1.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea1.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea1.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea2 = new Subarea();
            bedomningsinstrument_subarea2.Id = 2;
            bedomningsinstrument_subarea2.Title = "Diagnostik av skadligt bruk, missbruk eller beroende";
            bedomningsinstrument_subarea2.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea2.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea2.Values_andelklienter = new int[] { 0, 1, 2, 3 };


            Subarea bedomningsinstrument_subarea3 = new Subarea();
            bedomningsinstrument_subarea3.Id = 3;
            bedomningsinstrument_subarea3.Title = "Bedömning av hjälpbehov";
            bedomningsinstrument_subarea3.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea3.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea3.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea4 = new Subarea();
            bedomningsinstrument_subarea4.Id = 4;
            bedomningsinstrument_subarea4.Title = "Bedömning av hjälpbehov för ungdomar";
            bedomningsinstrument_subarea4.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea4.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea4.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            List<Subarea> subareaList1 = new List<Subarea>();
            subareaList1.Add(bedomningsinstrument_subarea1);
            subareaList1.Add(bedomningsinstrument_subarea2);
            subareaList1.Add(bedomningsinstrument_subarea3);
            subareaList1.Add(bedomningsinstrument_subarea4);

            area1.Subarea = subareaList1;

            Area area2 = new Area();
            area2.Id = 2;
            area2.Title = "Medicinska test";

            Subarea bedomningsinstrument_subarea1_2 = new Subarea();
            bedomningsinstrument_subarea1_2.Id = 1;
            bedomningsinstrument_subarea1_2.Title = "Nyligt intag av alkohol";
            bedomningsinstrument_subarea1_2.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea1_2.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea1_2.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea2_2 = new Subarea();
            bedomningsinstrument_subarea2_2.Id = 2;
            bedomningsinstrument_subarea2_2.Title = "Långvarigt högt intag av alkohol";
            bedomningsinstrument_subarea2_2.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea2_2.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea2_2.Values_andelklienter = new int[] { 0, 1, 2, 3 };


            Subarea bedomningsinstrument_subarea3_2 = new Subarea();
            bedomningsinstrument_subarea3_2.Id = 3;
            bedomningsinstrument_subarea3_2.Title = "Pågående eller nyligt intag av narkotika";
            bedomningsinstrument_subarea3_2.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea3_2.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea3_2.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            List<Subarea> subareaList2 = new List<Subarea>();
            subareaList2.Add(bedomningsinstrument_subarea1_2);
            subareaList2.Add(bedomningsinstrument_subarea2_2);
            subareaList2.Add(bedomningsinstrument_subarea3_2);

            area2.Subarea = subareaList2;

            Area area3 = new Area();
            area3.Id = 3;
            area3.Title = "Psykologisk och psykosocial behandling";

            Subarea bedomningsinstrument_subarea1_3 = new Subarea();
            bedomningsinstrument_subarea1_3.Id = 1;
            bedomningsinstrument_subarea1_3.Title = "Missbruk eller beroende av alkohol";
            bedomningsinstrument_subarea1_3.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea1_3.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea1_3.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea2_3 = new Subarea();
            bedomningsinstrument_subarea2_3.Id = 2;
            bedomningsinstrument_subarea2_3.Title = "Långvarigt bruk av bensodiazepiner";
            bedomningsinstrument_subarea2_3.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea2_3.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea2_3.Values_andelklienter = new int[] { 0, 1, 2, 3 };


            Subarea bedomningsinstrument_subarea3_3 = new Subarea();
            bedomningsinstrument_subarea3_3.Id = 3;
            bedomningsinstrument_subarea3_3.Title = "Missbruk eller beroende av cannabis";
            bedomningsinstrument_subarea3_3.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea3_3.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea3_3.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea4_3 = new Subarea();
            bedomningsinstrument_subarea4_3.Id = 3;
            bedomningsinstrument_subarea4_3.Title = "Missbruk eller beroende av centralstimulantia";
            bedomningsinstrument_subarea4_3.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea4_3.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea4_3.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea5_3 = new Subarea();
            bedomningsinstrument_subarea5_3.Id = 3;
            bedomningsinstrument_subarea5_3.Title = "Missbruk eller beroende av opiater";
            bedomningsinstrument_subarea5_3.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea5_3.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea5_3.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea6_3 = new Subarea();
            bedomningsinstrument_subarea6_3.Id = 3;
            bedomningsinstrument_subarea6_3.Title = "Nätverks-/parterapi vid alkohol-/ narkotikaproblem";
            bedomningsinstrument_subarea6_3.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea6_3.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea6_3.Values_andelklienter = new int[] { 0, 1, 2, 3 };


            List<Subarea> subareaList3 = new List<Subarea>();
            subareaList3.Add(bedomningsinstrument_subarea1_3);
            subareaList3.Add(bedomningsinstrument_subarea2_3);
            subareaList3.Add(bedomningsinstrument_subarea3_3);
            subareaList3.Add(bedomningsinstrument_subarea4_3);
            subareaList3.Add(bedomningsinstrument_subarea5_3);
            subareaList3.Add(bedomningsinstrument_subarea6_3);

            area3.Subarea = subareaList3;

            Area area4 = new Area();
            area4.Id = 4;
            area4.Title = "Psykosociala stödinsatser";

            Subarea bedomningsinstrument_subarea1_4 = new Subarea();
            bedomningsinstrument_subarea1_4.Id = 1;
            bedomningsinstrument_subarea1_4.Title = "Arbetslivsinriktad rehabilitering";
            bedomningsinstrument_subarea1_4.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea1_4.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea1_4.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea2_4 = new Subarea();
            bedomningsinstrument_subarea2_4.Id = 2;
            bedomningsinstrument_subarea2_4.Title = "Boendestöd";
            bedomningsinstrument_subarea2_4.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea2_4.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea2_4.Values_andelklienter = new int[] { 0, 1, 2, 3 };


            Subarea bedomningsinstrument_subarea3_4 = new Subarea();
            bedomningsinstrument_subarea3_4.Id = 3;
            bedomningsinstrument_subarea3_4.Title = "Boendeinsatser vid hemlöshet";
            bedomningsinstrument_subarea3_4.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea3_4.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea3_4.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea4_4 = new Subarea();
            bedomningsinstrument_subarea4_4.Id = 3;
            bedomningsinstrument_subarea4_4.Title = "Samordning av vård- och stödinsatser";
            bedomningsinstrument_subarea4_4.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea4_4.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea4_4.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea5_4 = new Subarea();
            bedomningsinstrument_subarea5_4.Id = 3;
            bedomningsinstrument_subarea5_4.Title = "Psykosocialt stöd till vuxna anhöriga";
            bedomningsinstrument_subarea5_4.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea5_4.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea5_4.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea6_4 = new Subarea();
            bedomningsinstrument_subarea6_4.Id = 3;
            bedomningsinstrument_subarea6_4.Title = "Stöd till anhöriga som vill motivera närstående till behandling";
            bedomningsinstrument_subarea6_4.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea6_4.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea6_4.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            List<Subarea> subareaList4 = new List<Subarea>();
            subareaList4.Add(bedomningsinstrument_subarea1_4);
            subareaList4.Add(bedomningsinstrument_subarea2_4);
            subareaList4.Add(bedomningsinstrument_subarea3_4);
            subareaList4.Add(bedomningsinstrument_subarea4_4);
            subareaList4.Add(bedomningsinstrument_subarea5_4);
            subareaList4.Add(bedomningsinstrument_subarea6_4);
            area4.Subarea = subareaList4;

            Area area5 = new Area();
            area5.Id = 5;
            area5.Title = "Behandling vid samsjuklighet";

            Subarea bedomningsinstrument_subarea1_5 = new Subarea();
            bedomningsinstrument_subarea1_5.Id = 1;
            bedomningsinstrument_subarea1_5.Title = "Integrerad behandlingsmetod (Psykologiska och psykosociala behandlingsmetoder i kombination med farmalogiskbehandling)";
            bedomningsinstrument_subarea1_5.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea1_5.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea1_5.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea2_5 = new Subarea();
            bedomningsinstrument_subarea2_5.Id = 2;
            bedomningsinstrument_subarea2_5.Title = "Samordning av vårdinsatser vid samsjuklighet";
            bedomningsinstrument_subarea2_5.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea2_5.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea2_5.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            List<Subarea> subareaList5 = new List<Subarea>();
            subareaList5.Add(bedomningsinstrument_subarea1_5);
            subareaList5.Add(bedomningsinstrument_subarea2_5);

            area5.Subarea = subareaList5;

            Area area6 = new Area();
            area6.Id = 6;
            area6.Title = "Ungdomar";

            Subarea bedomningsinstrument_subarea1_6 = new Subarea();
            bedomningsinstrument_subarea1_6.Id = 1;
            bedomningsinstrument_subarea1_6.Title = "Korta insatser (BI) för ungdomar";
            bedomningsinstrument_subarea1_6.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea1_6.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea1_6.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea2_6 = new Subarea();
            bedomningsinstrument_subarea2_6.Id = 2;
            bedomningsinstrument_subarea2_6.Title = "Familjeinterventioner för ungdomar";
            bedomningsinstrument_subarea2_6.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea2_6.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea2_6.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            List<Subarea> subareaList6 = new List<Subarea>();
            subareaList6.Add(bedomningsinstrument_subarea1_6);
            subareaList6.Add(bedomningsinstrument_subarea2_6);

            area6.Subarea = subareaList6;


            List<Area> areaList = new List<Area>();
            areaList.Add(area1);
            areaList.Add(area2);
            areaList.Add(area3);
            areaList.Add(area4);
            areaList.Add(area5);
            areaList.Add(area6);
            return areaList;
        }


    }
}
