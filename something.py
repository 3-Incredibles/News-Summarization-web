from transformers import PegasusForConditionalGeneration, PegasusTokenizer
import torch
# src_text = [
#     """ PG&E stated it scheduled the blackouts in response to forecasts for high winds amid dry conditions. 
#     The aim is to reduce the risk of wildfires. Nearly 800 thousand customers were scheduled to be affected 
#     by the shutoffs which were expected to last through at least midday tomorrow."""
# ]

def summarize(src_text):
    model_name = 'google/pegasus-multi_news'
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print("DEVICE \n", device)
    tokenizer = PegasusTokenizer.from_pretrained(model_name)
    print('TOKENIZER \n', tokenizer)

    model = PegasusForConditionalGeneration.from_pretrained(model_name).to(device)
    print("MODEL \n", model)

    print("BLAH  :  \n", tokenizer(src_text, truncation=True, padding='longest', return_tensors="pt"))
    batch = tokenizer(src_text, truncation=True, padding='longest', return_tensors="pt").to(device)
    print("BATCH: \n", batch)

    translated = model.generate(**batch)
    tgt_text = tokenizer.batch_decode(translated, skip_special_tokens=True)
    return "".join(tgt_text)

#assert tgt_text[0] == "California's largest electricity provider has turned off power to hundreds of thousands of customers."
