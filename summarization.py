from transformers import PegasusForConditionalGeneration, PegasusTokenizer
import torch

with open("content/Speech_to_Text_Test_Document.txt",'r') as file_handler:
    file_readerr=file_handler.read()
    file_strip=file_readerr.strip()
    file_update=file_strip.replace('\n','')
    
src_text=file_update

model_name1 = 'google/pegasus-cnn_dailymail'
torch_device1 = 'cuda' if torch.cuda.is_available() else 'cpu'

tokenizer1 = PegasusTokenizer.from_pretrained(model_name1)
model1 = PegasusForConditionalGeneration.from_pretrained(model_name1).to(torch_device1)

batch = tokenizer1.prepare_seq2seq_batch(src_text, truncation=True, padding='longest', return_tensors="pt",max_length = 2000, max_target_length= 2000).to(torch_device1)

translated1 = model1.generate(**batch, max_length= 200, min_length=1)
tgt_text1 = tokenizer1.batch_decode(translated1, skip_special_tokens=True)

ds = open("content/Summarization1.txt","w")
for txt in tgt_text1:
  ds.write(txt)
ds = open("/content/Summarization1.txt","r")
print(ds.read())