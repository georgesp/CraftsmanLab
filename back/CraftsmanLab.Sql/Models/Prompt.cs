using System;

namespace CraftsmanLab.Sql
{
    /// <summary>
    /// Mod�le de donn�es pour un Prompt
    /// </summary>
    public class Prompt
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}