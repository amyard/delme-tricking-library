using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TrickingLibrary.Data;
using TrickingLibrary.Models;

namespace TrickingLibrary.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();

                if (env.IsDevelopment())
                {
                    ctx.Add(new Difficulty { Id = "easy", Name = "Easy", Description = "Easy test"});
                    ctx.Add(new Difficulty { Id = "medium", Name = "Medium", Description = "Medium test"});
                    ctx.Add(new Difficulty { Id = "hard", Name = "Hard", Description = "Hard test"});
                    
                    ctx.Add(new Category { Id = "kick", Name = "Kick", Description = "Kick test"});
                    ctx.Add(new Category { Id = "flip", Name = "Flip", Description = "Flip test"});
                    ctx.Add(new Category { Id = "transition", Name = "Transition", Description = "Transition test"});

                    ctx.Add(new Trick
                    {
                        Id = "backwards-roll",
                        Name = "Backwards Roll",
                        Description = "This is test backwards roll",
                        Difficulty = "easy",
                        TrickCategories = new List<TrickCategory> {new TrickCategory {CategoryId = "flip"}}
                    });
                    
                    ctx.Add(new Trick
                    {
                        Id = "back-flip",
                        Name = "Back Flip",
                        Description = "This is back flip",
                        Difficulty = "medium",
                        TrickCategories = new List<TrickCategory> {new TrickCategory {CategoryId = "flip"}},
                        Prerequisites = new List<TrickRelationship>{new TrickRelationship{PrerequisiteId = "backwards-roll"}}
                    });

                    ctx.SaveChanges();
                }
            }
            
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}