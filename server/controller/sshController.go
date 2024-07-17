package controller

import (
    "github.com/Talfaza/bridgehub/database"
    "github.com/Talfaza/bridgehub/models"
    "golang.org/x/crypto/ssh"
    "github.com/gofiber/fiber/v2"
    "time"
)

type SSHRequest struct {
    ServerID uint   `json:"server_id"`
    Command  string `json:"command"`
}

func executeSSHCommand(server models.Server, command string) (string, error) {
    config := &ssh.ClientConfig{
        User: server.Hostname,
        Auth: []ssh.AuthMethod{
            ssh.Password(server.Password),
        },
        HostKeyCallback: ssh.InsecureIgnoreHostKey(),
        Timeout:         5 * time.Second,
    }

    conn, err := ssh.Dial("tcp", server.IPAddress+":22", config)
    if err != nil {
        return "", err
    }
    defer conn.Close()

    session, err := conn.NewSession()
    if err != nil {
        return "", err
    }
    defer session.Close()

    output, err := session.CombinedOutput(command)
    if err != nil {
        return "", err
    }

    return string(output), nil
}

func ExecuteCommand(c *fiber.Ctx) error {
    var request SSHRequest
    if err := c.BodyParser(&request); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "message": "Invalid request",
            "error":   err.Error(),
        })
    }

    var server models.Server
    if err := database.DB.First(&server, request.ServerID).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "message": "Server not found",
            "error":   err.Error(),
        })
    }

    output, err := executeSSHCommand(server, request.Command)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "message": "Failed to execute command",
            "error":   err.Error(),
        })
    }

    return c.JSON(fiber.Map{
        "output": output,
    })
}
