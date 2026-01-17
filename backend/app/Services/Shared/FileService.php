<?php

declare(strict_types=1);

namespace App\Services\Shared;

use Illuminate\Support\Facades\Storage;

class FileService
{
    /**
     * Delete a file.
     */
    public function delete(
        string $path,
        ?string $disk = 'local',
        ?string $defaultSubpath = null
    ): void {
        if ($this->isDefault($path, $defaultSubpath)) {
            return;
        }

        if (Storage::disk($disk)->exists($path)) {
            Storage::disk($disk)->delete($path);
        }
    }

    private function isDefault(string $path, ?string $defaultSubpath): bool
    {
        return $defaultSubpath !== null && str_contains($path, $defaultSubpath);
    }
}
