{
  description = "Polkadot Uruguay - Community website built with Astro";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Node.js and package managers
            nodejs_22
            pnpm

            # Build tools
            nodePackages.typescript
            nodePackages.typescript-language-server

            # Useful development tools
            git

            # For downloading fonts (optional)
            curl
            wget
          ];

          shellHook = ''
            echo "🚀 Polkadot Uruguay Development Environment"
            echo ""
            echo "Node version: $(node --version)"
            echo "pnpm version: $(pnpm --version)"
            echo ""
            echo "📦 To install dependencies, run: pnpm install"
            echo "🏃 To start development server, run: pnpm dev"
            echo "🏗️  To build for production, run: pnpm build"
            echo ""
            echo "📝 Don't forget to:"
            echo "   1. Download fonts (see public/fonts/README.md)"
            echo "   2. Configure .env with Mailchimp credentials"
            echo ""

            # Set up environment variables
            export ASTRO_TELEMETRY_DISABLED=1

            # Create node_modules/.bin in PATH if not already there
            export PATH="$PWD/node_modules/.bin:$PATH"
          '';

          # Environment variables
          ASTRO_TELEMETRY_DISABLED = "1";
        };

        # Default package (for building the site)
        packages.default = pkgs.stdenv.mkDerivation {
          pname = "polkadot-uy";
          version = "0.0.1";

          src = ./.;

          buildInputs = with pkgs; [
            nodejs_22
            pnpm
          ];

          buildPhase = ''
            export HOME=$TMPDIR
            pnpm install --frozen-lockfile
            pnpm build
          '';

          installPhase = ''
            mkdir -p $out
            cp -r dist/* $out/
          '';
        };
      }
    );
}
