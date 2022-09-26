package config

import (
	"fmt"
	"os"

	"github.com/kelseyhightower/envconfig"
	"gopkg.in/yaml.v2"
)

type Config struct {
	APIService struct {
		Hostname string `yaml:"hostname" envconfig:"API_HOSTNAME"`
		Port     string `yaml:"port" envconfig:"API_PORT"`
	} `yaml:"api-service"`
	BackendService struct {
		Hostname string `yaml:"hostname" envconfig:"BACKEND_HOSTNAME"`
		Port     string `yaml:"port" envconfig:"BACKEND_PORT"`
	} `yaml:"backend-service"`
	Database struct {
		Hostname     string `yaml:"hostname" envconfig:"DB_HOSTNAME"`
		Username     string `yaml:"username" envconfig:"DB_USERNAME"`
		Password     string `yaml:"password" envconfig:"DB_PASSWORD"`
		DatabaseName string `yaml:"database_name" envconfig:"DB_DATABASE_NAME"`
	} `yaml:"database"`
}

func processError(err error) {
	fmt.Println(err)
	os.Exit(2)
}

func ReadFile(cfg *Config) {
	f, err := os.Open("/app/config/config.yml")
	if err != nil {
		processError(err)
	}
	defer f.Close()

	decoder := yaml.NewDecoder(f)
	err = decoder.Decode(cfg)
	if err != nil {
		processError(err)
	}
}

func ReadEnv(cfg *Config) {
	err := envconfig.Process("", cfg)
	if err != nil {
		processError(err)
	}
}
