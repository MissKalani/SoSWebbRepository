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

            var settings = new JsonSerializerSettings();
            settings.ContractResolver = new LowercaseContractResolver();
            var json = JsonConvert.SerializeObject(areaList, Formatting.Indented, settings);


            File.WriteAllText(@"C:\dev\SoSWebb\SoSWebb.JsonSerializer\json\data.json", json);

        }

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

            List<Subarea> subareaList1 = new List<Subarea>();
            subareaList1.Add(bedomningsinstrument_subarea1);
            subareaList1.Add(bedomningsinstrument_subarea2);
            subareaList1.Add(bedomningsinstrument_subarea3);

            area1.Subarea = subareaList1;

            Area area2 = new Area();
            area2.Id = 2;
            area2.Title = "Medicinska test";

            Subarea bedomningsinstrument_subarea1_2 = new Subarea();
            bedomningsinstrument_subarea1_2.Id = 1;
            bedomningsinstrument_subarea1_2.Title = "Nyligt intag av alokohol";
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

            List<Area> areaList = new List<Area>();
            areaList.Add(area1);
            areaList.Add(area2);
            return areaList;
        }

        private static List<Insatsen> createInsatsen()
        {
            Question question1 = new Question();
            question1.Id = 1;
            question1.QuestionStatement = "Kan insatsen möta behoven?";
            question1.QuestionValues = new string[] {"Nej","Sannolikt inte","Osäkert", "Sannolikt Ja", "Ja", "Varierar" };

            Question question2 = new Question();
            question2.Id = 1;
            question2.QuestionStatement = "vilken prioritering har insatsen i NR?";
            question2.QuestionValues = new string[] { "1", "2", "3", "4", "5", "Annan" };

            Question question3 = new Question();
            question3.Id = 1;
            question3.QuestionStatement = "Är insatsen värderingsmässigt acceptabel för de flesta aktörer?";
            question3.QuestionValues = new string[] { "Nej", "Sannolikt inte", "Osäkert", "Sannolikt Ja", "Ja", "Varierar" };

            Question question4 = new Question();
            question4.Id = 1;
            question4.QuestionStatement = "Är de förväntade oönskade effekterna av insatsen små?";
            question4.QuestionValues = new string[] { "Nej", "Sannolikt inte", "Osäkert", "Sannolikt Ja", "Ja", "Varierar" };

            Question question5 = new Question();
            question5.Id = 1;
            question5.QuestionStatement = "är insatsen möjlig att implementera utan anpassning?";
            question5.QuestionValues = new string[] { "Nej", "Sannolikt inte", "Osäkert", "Sannolikt Ja", "Ja", "Varierar" };

            Question question6 = new Question();
            question6.Id = 1;
            question6.QuestionStatement = "är behovet av resurser (tid, pengar, kunskap, personal) för att genomföra insatsen lågt?";
            question6.QuestionValues = new string[] { "Nej", "Sannolikt inte", "Osäkert", "Sannolikt Ja", "Ja", "Varierar" };

            Question question7 = new Question();
            question7.Id = 1;
            question7.QuestionStatement = "Är insatsen hållbar på lång sikt?";
            question7.QuestionValues = new string[] { "Nej", "Sannolikt inte", "Osäkert", "Sannolikt Ja", "Ja", "Varierar" };

            Insatsen insats1 = new Insatsen();
            List<Question> questionList1 = new List<Question>();
            questionList1.Add(question1);
            questionList1.Add(question2);
            questionList1.Add(question3);
            questionList1.Add(question4);
            questionList1.Add(question5);
            questionList1.Add(question6);
            questionList1.Add(question7);

            Insatsen insats2 = new Insatsen();
            List<Question> questionList2 = new List<Question>();
            questionList2.Add(question1);
            questionList2.Add(question2);
            questionList2.Add(question3);
            questionList2.Add(question4);
            questionList2.Add(question5);
            questionList2.Add(question6);
            questionList2.Add(question7);

            Insatsen insats3 = new Insatsen();
            List<Question> questionList3 = new List<Question>();
            questionList3.Add(question1);
            questionList3.Add(question2);
            questionList3.Add(question3);
            questionList3.Add(question4);
            questionList3.Add(question5);
            questionList3.Add(question6);
            questionList3.Add(question7);

            Insatsen insats4 = new Insatsen();
            List<Question> questionList4 = new List<Question>();
            questionList4.Add(question1);
            questionList4.Add(question2);
            questionList4.Add(question3);
            questionList4.Add(question4);
            questionList4.Add(question5);
            questionList4.Add(question6);
            questionList4.Add(question7);

            Insatsen insats5 = new Insatsen();
            List<Question> questionList5 = new List<Question>();
            questionList5.Add(question1);
            questionList5.Add(question2);
            questionList5.Add(question3);
            questionList5.Add(question4);
            questionList5.Add(question5);
            questionList5.Add(question6);
            questionList5.Add(question7);

            Insatsen insats6 = new Insatsen();
            List<Question> questionList6 = new List<Question>();
            questionList6.Add(question1);
            questionList6.Add(question2);
            questionList6.Add(question3);
            questionList6.Add(question4);
            questionList6.Add(question5);
            questionList6.Add(question6);
            questionList6.Add(question7);

            Insatsen insats7 = new Insatsen();
            List<Question> questionList7 = new List<Question>();
            questionList7.Add(question1);
            questionList7.Add(question2);
            questionList7.Add(question3);
            questionList7.Add(question4);
            questionList7.Add(question5);
            questionList7.Add(question6);
            questionList7.Add(question7);

            Insatsen insats8 = new Insatsen();
            List<Question> questionList8 = new List<Question>();
            questionList8.Add(question1);
            questionList8.Add(question2);
            questionList8.Add(question3);
            questionList8.Add(question4);
            questionList8.Add(question5);
            questionList8.Add(question6);
            questionList8.Add(question7);

            insats1.Title = "Motivationshöjande behandling";
            insats1.Questions = questionList1;

            
        }
    }
}
