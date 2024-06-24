package controller

import (
    "golang.org/x/crypto/ssh"
    "github.com/gofiber/fiber/v2"
    "time"
)

type SSHRequest struct {
    IP       string `json:"ip"`
    Username string `json:"username"`
    Password string `json:"password"`
    Command  string `json:"command"`
}

func executeSSHCommand(ip, username, password, command string) (string, error) {
    config := &ssh.ClientConfig{
        User: username,
        Auth: []ssh.AuthMethod{
            ssh.Password(password),
        },
        HostKeyCallback: ssh.InsecureIgnoreHostKey(),
        Timeout:         5 * time.Second,
    }

    conn, err := ssh.Dial("tcp", ip+":22", config)
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

    output, err := executeSSHCommand(request.IP, request.Username, request.Password, request.Command)
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
