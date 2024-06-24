package routes

import (
	"github.com/Talfaza/bridgehub/controller"
	"github.com/gofiber/fiber/v2"
)

func RouteSetup(app *fiber.App)  {

  app.Post("/api/register",controller.Register)
  app.Post("api/login",controller.Login)
  //user will not acces any route under this line if he is not authentificated
  // app.Use(middleware.IsAuth) 

  
}
