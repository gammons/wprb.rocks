{ pkgs ? import <nixpkgs> { } }:

with pkgs;

mkShell {
  buildInputs = [
    stdenv
    mysql-client
    libmysqlclient
    sqlite
  ];
}
