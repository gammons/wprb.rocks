{ pkgs ? import <nixpkgs> { } }:

with pkgs;

mkShell {
  buildInputs = [
    yarn
    python2
  ];
}

