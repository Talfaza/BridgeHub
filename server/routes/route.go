package routes

import (
    "github.com/gofiber/fiber/v2"
    "github.com/Talfaza/bridgehub/controller"
    "github.com/Talfaza/bridgehub/middleware"
)

func RouteSetup (app *fiber.App) {
    
    api := app.Group("/api")
    api.Post("/register", controller.Register)
    api.Post("/login", controller.Login)

    // Dashboard route with authentication middleware
    api.Get("/dashboard", middleware.IsAuth, controller.Dashboard)
}

