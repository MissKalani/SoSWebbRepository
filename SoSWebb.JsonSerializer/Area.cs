using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoSWebb.JsonSerializer
{
    public class Area
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<Subarea> Subarea { get; set; }
    }

    public class Area2
    {
        public string Area { get; set; }
        public List<Subarea2> Subareas { get; set; }
    }

    public class Subarea
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int[] Values_bedomning { get; set; }
        public int[] Values_konsekvens { get; set; }
        public int[] Values_andelklienter { get; set; }
        public List<Insatsen> insatslist { get; set; }
    }

    public class Subarea2
    {  
        public string Title { get; set; }       
        public List<Insatsen> insatslist { get; set; }
    }
}
