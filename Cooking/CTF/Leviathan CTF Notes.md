# Leviathan CTF Walkthrough

>leviathan0

**ls -la** to find hidden files.  
Found bookmarks.html file.  
Opened with **less** and searched for "password" — found in the bookmark text the password for leviathan1.  
**Flag:** `3QJ3TgzHDq`

>leviathan1

Found a file called "check", no permissions to access.  
Things I tried:  
- **cat** → got a wall of nonsense.  
- **strings** → found a few words: `secr` and `love`.  
- **./check** → prompted me for password, but failed for `secr`, `love`, and even `secrlove`.  
- **ltrace ./check** → showed the program was using `strcmp()`. When entering `love`, `ltrace` showed it compared `love` with `sex`. Bingo.  
Switched to user `leviathan2`:  
`cd /etc/leviathan_pass`  
`cat leviathan2`  
**Flag:** `NsN1HwFoyN`

>leviathan2

Tried to print a file using the provided binary. Paths like `../leviathan3/level3` and `../../../etc/leviathan_pass/leviathan3` returned: *You can't have that file...*  
Tried creating a symlink:  
- Direct symlink in home failed  
- Created it in `/tmp` with:  
`ln -s /etc/leviathan_pass/leviathan3 hacked`  
`touch "read.txt"`  
`~/printfile "hacked read.txt"`  
`printfile` followed the symlink since I had permission for `read.txt`.  
**Flag:** `f0n8h2iWLP`

>leviathan3

Super easy level.  
`ltrace ./level3`  
Showed: `strcmp("h0no33", "snlprint")` → entered `snlprint`, it worked.  
`cd /etc/leviathan_pass`  
`cat leviathan4`  
**Flag:** `WG1egElCvO`

>leviathan4

Used **ls -la**, saw a hidden `.trash` directory.  
Entered it, found a file called `bin`.  
Ran it and it output binary.  
Used an online binary-to-text translator.  
**Flag:** `0dyxT7F4QD`

>leviathan5

The program `leviathan5` reads `file.log` from `/tmp`.  
I created a symlink:  
`ln -s /etc/leviathan_pass/leviathan6 /tmp/file.log`  
`~/leviathan5`  
**Flag:** `szo7HDB88w`

>leviathan6

This level was protected by a 4-digit PIN.  
Wrote a brute-force script:  
```bash
#!/bin/bash
for a in {0000..9999}
do
  ~/leviathan6 $a
done