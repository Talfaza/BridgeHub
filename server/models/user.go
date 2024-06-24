package models
import(
  "golang.org/x/crypto/bcrypt"
)
type User struct {
  Id       uint   `json:"id"`
  Username string `json:"username"` 
  Email    string `json:"email"`
  Password []byte `json:"-"`
}

func (user *User) HashingPass(password string) ([]byte, error) {
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return nil, err
	}
	user.Password = hashedPass
	return user.Password, nil
}

