'/Volumes/data_500/repos mb air/zhdk/spatial-interaction/whisper.cpp/stream' -c 0 -f '/Volumes/data_500/repos mb air/zhdk/spatial-interaction/nuxt/whisper.txt' -l de -m '/Volumes/data_500/repos mb air/zhdk/spatial-interaction/whisper.cpp/models/ggml-large-v3-q5_0.bin' -t 8 --step 10000 --length 10000;
./stream -c 0 -f ./whisper.txt' -l de -m ./models/ggml-large-v3-q5_0.bin -t 8 --step 10000 --length 10000;
./stream -c 0 --file ./whisper.txt --language de --model ./models/ggml-large-v3-q5_0.bin --threads 8 --step 10000 --length 10000 --keep-context;