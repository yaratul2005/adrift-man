# To make it more cinematic, let's update some animation delays and add more continuous motion
sed -i 's/translateY(-8px)/translateY(-24px)/g' src/components/panels/*.tsx
sed -i 's/translateY(8px)/translateY(24px)/g' src/components/panels/*.tsx
