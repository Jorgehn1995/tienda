<?php

namespace App\Imports;

use App\Models\Producto;
use Maatwebsite\Excel\Cell;
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
                    if (!isset($this->data[$row[1]])) {
                        $this->data[$row[1]] = [];
                    }
                    $row[12] = Producto::where("codigo", $row[1])->count();
                    array_push($this->data[$row[1]], $row);
                }
            }
        }
    }
}
