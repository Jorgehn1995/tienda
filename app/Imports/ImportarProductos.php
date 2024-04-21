<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class ImportarProductos implements ToCollection
{
    public $data = [];
    public function collection(Collection $rows)
    {

        foreach ($rows as $key => $row) {
            if ($key > 0) {
                if ($row[1] || $row[2]) {
                    $this->data[$key] = $row;
                }
            }
        }
    }
}
