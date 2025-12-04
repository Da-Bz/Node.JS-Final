{ pkgs, ... }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.firebase-tools
  ];
  env = { };
  idx = {
    extensions = [
      "google.gemini-cli-vscode-ide-companion"
    ];
    workspace = {
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";
      };
    };
    previews = {
      enable = false;
      previews = {
        web = {
          command = [
            "npm"
            "run"
            "dev"
            "--"
            "--port"
            "$PORT"
            "--host"
            "0.0.0.0"
            "--disable-host-check"
          ];
          manager = "web";
          # cwd = "app/client"; # opcional
        };
      };
    };
  };
}

