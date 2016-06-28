using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoSWebb.JsonSerializer
{
    public class Insatsen
    {
        //public int Id { get; set; }
        public string Title { get; set; }
        public List<Question> Questions { get; set; }
    }
    public class Question
    {
        //public int Id { get; set; }
        public string QuestionStatement { get; set; }
        public string[] QuestionValues { get; set; }

    }
       
}
