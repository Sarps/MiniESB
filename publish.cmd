apic login --server 127.0.0.1:9000 --username esarpong51@gmail.com --password *****
apic drafts:push somefilename.yaml --server 127.0.0.1:9000 --organization automation
apic publish somefilename.yaml --catalog nonprod --organization automation --server 127.0.0.1:9000
apic logout --server 127.0.0.1:9000
