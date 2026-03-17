using Domain;using Infrastructure;
namespace Application{
  public static class Seed{
    public static async Task InitAsync(AppDb db){
      if(!db.Users.Any()){
        db.Users.AddRange(Enumerable.Range(1,100).Select(i=>new User(i,$"user{i}@demo.com",$"User {i}")));
        await db.SaveChangesAsync();
      }
    }
  }
}
