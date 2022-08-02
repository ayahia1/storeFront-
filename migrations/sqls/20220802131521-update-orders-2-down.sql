ALTER TABLE orders 
    ADD COLUMN product_ids INT[],
    ADD COLUMN quantities INT[]
;