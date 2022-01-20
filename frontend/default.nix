{ pkgs ? import <nixpkgs> { } }:

with pkgs;

mkShell {
  buildInputs = [
    yarn
    nodejs
    python2
    nodePackages.typescript
    nodePackages.typescript-language-server
  ];
}

