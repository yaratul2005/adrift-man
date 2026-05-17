sed -i 's/<img/<Image fill/g' src/components/panels/Panel4Trailer.tsx
sed -i "s/import { cn } from '@\/lib\/utils';/import { cn } from '@\/lib\/utils';\nimport Image from 'next\/image';/g" src/components/panels/Panel4Trailer.tsx
