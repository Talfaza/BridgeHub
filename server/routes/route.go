package routes

import (
	"github.com/Talfaza/bridgehub/controller"
	"github.com/gofiber/fiber/v2"
  "github.com/Talfaza/bridgehub/middleware"
)

func RouteSetup(app *fiber.App)  {

  app.Post("/api/register",controller.Register)
  app.Post("api/login",controller.Login)
  //user will not acces any route under this line if he is not authentificated
  app.Use(middleware.IsAuth) 
  app.Post("/api/execute", controller.ExecuteCommand)
  app.Post("api/addserver",controller.AddServer)
	app.Get("/api/getservers", controller.GetUserServers)
  
}
