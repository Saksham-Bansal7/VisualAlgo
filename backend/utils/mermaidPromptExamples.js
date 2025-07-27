// Mermaid prompt examples for different programming languages

export const getMermaidPromptExamples = (language) => {
  switch (language) {
    case "javascript":
      return `use the examples - {
source code - function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}, mermaid js code - 
flowchart TD
    Start([Start]) --> SetLeftRight["Set left = 0, right = n-1"]
    SetLeftRight --> Loop{Is left ≤ right?}
    
    Loop -- No --> NotFound([Return -1])
    Loop -- Yes --> CalcMid["mid = Math.floor((left + right) / 2)"]
    CalcMid --> Compare{"arr[mid] === target?"}
    
    Compare -- Yes --> Found([Return mid])
    Compare -- No --> LessOrGreater{"arr[mid] < target?"}
    
    LessOrGreater -- Yes --> MoveRight["left = mid + 1"]
    LessOrGreater -- No --> MoveLeft["right = mid - 1"]
    
    MoveLeft --> Loop
    MoveRight --> Loop,

source code - function maxRob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    function robHelper(index) {
        if (index >= nums.length) return 0;
        
        const rob = nums[index] + robHelper(index + 2);
        const notRob = robHelper(index + 1);
        
        return Math.max(rob, notRob);
    }
    
    return robHelper(0);
}, mermaid js code - 
flowchart TD
    Start --> CheckEmpty{nums.length === 0?}
    CheckEmpty -- Yes --> ReturnZero([Return 0])
    CheckEmpty -- No --> CheckOne{nums.length === 1?}
    CheckOne -- Yes --> ReturnFirst([Return nums[0]])
    CheckOne -- No --> CallHelper["Call robHelper(0)"]
    
    CallHelper --> CheckIndex{index >= nums.length?}
    CheckIndex -- Yes --> ReturnZeroHelper([Return 0])
    CheckIndex -- No --> CalcRob["rob = nums[index] + robHelper(index + 2)"]
    CalcRob --> CalcNotRob["notRob = robHelper(index + 1)"]
    CalcNotRob --> ReturnMax["Return Math.max(rob, notRob)"]
    ReturnMax --> End([End])
}`;

    case "python":
      return `use the examples - {
source code - def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1, mermaid js code - 
flowchart TD
    Start([Start]) --> SetLeftRight["Set left = 0, right = len(arr) - 1"]
    SetLeftRight --> Loop{Is left ≤ right?}
    
    Loop -- No --> NotFound([Return -1])
    Loop -- Yes --> CalcMid["mid = (left + right) // 2"]
    CalcMid --> Compare{"arr[mid] == target?"}
    
    Compare -- Yes --> Found([Return mid])
    Compare -- No --> LessOrGreater{"arr[mid] < target?"}
    
    LessOrGreater -- Yes --> MoveRight["left = mid + 1"]
    LessOrGreater -- No --> MoveLeft["right = mid - 1"]
    
    MoveLeft --> Loop
    MoveRight --> Loop,

source code - def max_rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    def rob_helper(index):
        if index >= len(nums):
            return 0
        
        rob = nums[index] + rob_helper(index + 2)
        not_rob = rob_helper(index + 1)
        
        return max(rob, not_rob)
    
    return rob_helper(0), mermaid js code - 
flowchart TD
    Start --> CheckEmpty{Is nums empty?}
    CheckEmpty -- Yes --> ReturnZero([Return 0])
    CheckEmpty -- No --> CheckOne{len(nums) == 1?}
    CheckOne -- Yes --> ReturnFirst([Return nums[0]])
    CheckOne -- No --> CallHelper["Call rob_helper(0)"]
    
    CallHelper --> CheckIndex{index >= len(nums)?}
    CheckIndex -- Yes --> ReturnZeroHelper([Return 0])
    CheckIndex -- No --> CalcRob["rob = nums[index] + rob_helper(index + 2)"]
    CalcRob --> CalcNotRob["not_rob = rob_helper(index + 1)"]
    CalcNotRob --> ReturnMax["Return max(rob, not_rob)"]
    ReturnMax --> End([End])
}`;

    case "java":
      return `use the examples - {
source code - import java.util.*;

class GfG {

    private static void
    topologicalSortUtil(int v, List<Integer>[] adj,
                        boolean[] visited,
                        Stack<Integer> stack)
    {
        visited[v] = true;

        for (int i : adj[v]) {
            if (!visited[i]) {
                topologicalSortUtil(i, adj, visited, stack);
            }
        }

        stack.push(v);
    }
    static List<Integer>[] constructadj(int V,
                                        int[][] edges)
    {

        List<Integer>[] adj = new ArrayList[V];

        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
        }
        return adj;
    }
    static int[] topologicalSort(int V, int[][] edges)
    {
        Stack<Integer> stack = new Stack<>();
        boolean[] visited = new boolean[V];

        List<Integer>[] adj = constructadj(V, edges);
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                topologicalSortUtil(i, adj, visited, stack);
            }
        }

        int[] result = new int[V];
        int index = 0;
        while (!stack.isEmpty()) {
            result[index++] = stack.pop();
        }

        return result;
    }
}, mermaid js code - 
flowchart TD
 Start --> Initialize
 Initialize[Initialize graph with V vertices and edges]
 Initialize --> ConstructAdj
 ConstructAdj[Construct adjacency list]
 ConstructAdj --> TopologicalSort
 TopologicalSort[Perform topological sort]

 TopologicalSort --> InitializeStack
 InitializeStack[Initialize empty stack]
 InitializeStack --> MarkAllUnvisited
 MarkAllUnvisited[Mark all vertices as unvisited]

 MarkAllUnvisited --> LoopVertices
 LoopVertices{Loop through all vertices}
 LoopVertices -- Yes --> VisitVertex
 VisitVertex[Visit unvisited vertex]
 VisitVertex --> MarkVisited
 MarkVisited[Mark vertex as visited]

 MarkVisited --> LoopNeighbors
 LoopNeighbors{Loop through neighbors of vertex}
 LoopNeighbors -- Yes --> VisitNeighbor
 VisitNeighbor[Visit unvisited neighbor recursively]
 VisitNeighbor --> MarkVisited

 LoopNeighbors -- No --> PushVertex
 PushVertex[Push vertex onto stack]
 PushVertex --> LoopVertices

 LoopVertices -- No --> PopVertices
 PopVertices[Pop vertices from stack and store in result]
 PopVertices --> End
 End[End of topological sort], 

source code - import java.io.*;

class BinarySearch {
  
    int binarySearch(int arr[], int x)
    {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == x)
                return mid;

            if (arr[mid] < x)
                low = mid + 1;

            else
                high = mid - 1;
        }

        return -1;
    }
}, mermaid js code - 
flowchart TD
    Start([Start]) --> SetLowHigh["Set low = 0, high = n-1"]
    SetLowHigh --> Loop{Is low ≤ high?}
    
    Loop -- No --> NotFound([Return -1])
    Loop -- Yes --> CalcMid["mid = (low + high) / 2"]
    CalcMid --> Compare{"arr[mid] == target?"}
    
    Compare -- Yes --> Found([Return mid])
    Compare -- No --> LessOrGreater{"arr[mid] > target?"}
    
    LessOrGreater -- Yes --> MoveLeft["high = mid - 1"]
    LessOrGreater -- No --> MoveRight["low = mid + 1"]
    
    MoveLeft --> Loop
    MoveRight --> Loop,

source code - class GfG {
  
    static int maxLootRec(int[] hval, int n) {
    
        if (n <= 0) return 0;
      
        if (n == 1) return hval[0];

        int pick = hval[n - 1] + maxLootRec(hval, n - 2);
        int notPick = maxLootRec(hval, n - 1);

        return Math.max(pick, notPick);
    }

    static int maxLoot(int[] hval) {
        int n = hval.length;
      
        return maxLootRec(hval, n);
    }
},
mermaidjs flowchart code - 
flowchart TD
Start --> CheckIfNoHouses{n <= 0?}
CheckIfNoHouses -- Yes --> ReturnZero([Return 0])
CheckIfNoHouses -- No --> CheckIfOneHouse{n == 1?}
CheckIfOneHouse -- Yes --> ReturnOneHouse([Return hval[0]])
CheckIfOneHouse -- No --> CalculateMaxLoot[Two Choices: Rob nth house or not]
CalculateMaxLoot --> PickHouse["pick = hval[n-1] + maxLootRec(hval, n-2)"]
CalculateMaxLoot --> DoNotPick["notPick = maxLootRec(hval, n-1)"]
PickHouse --> ReturnMax["Return Math.max(pick, notPick)"]
DoNotPick --> ReturnMax
ReturnMax --> End([End])
}`;

    case "cpp":
      return `use the examples - {
source code - #include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}, mermaid js code - 
flowchart TD
    Start([Start]) --> SetLeftRight["Set left = 0, right = arr.size() - 1"]
    SetLeftRight --> Loop{Is left ≤ right?}
    
    Loop -- No --> NotFound([Return -1])
    Loop -- Yes --> CalcMid["mid = left + (right - left) / 2"]
    CalcMid --> Compare{"arr[mid] == target?"}
    
    Compare -- Yes --> Found([Return mid])
    Compare -- No --> LessOrGreater{"arr[mid] < target?"}
    
    LessOrGreater -- Yes --> MoveRight["left = mid + 1"]
    LessOrGreater -- No --> MoveLeft["right = mid - 1"]
    
    MoveLeft --> Loop
    MoveRight --> Loop,

source code - #include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        if (nums.empty()) return 0;
        if (nums.size() == 1) return nums[0];
        
        return robHelper(nums, 0);
    }
    
private:
    int robHelper(vector<int>& nums, int index) {
        if (index >= nums.size()) return 0;
        
        int robCurrent = nums[index] + robHelper(nums, index + 2);
        int skipCurrent = robHelper(nums, index + 1);
        
        return max(robCurrent, skipCurrent);
    }
}, mermaid js code - 
flowchart TD
    Start --> CheckEmpty{nums.empty()?}
    CheckEmpty -- Yes --> ReturnZero([Return 0])
    CheckEmpty -- No --> CheckOne{nums.size() == 1?}
    CheckOne -- Yes --> ReturnFirst([Return nums[0]])
    CheckOne -- No --> CallHelper["Call robHelper(nums, 0)"]
    
    CallHelper --> CheckIndex{index >= nums.size()?}
    CheckIndex -- Yes --> ReturnZeroHelper([Return 0])
    CheckIndex -- No --> CalcRob["robCurrent = nums[index] + robHelper(nums, index + 2)"]
    CalcRob --> CalcSkip["skipCurrent = robHelper(nums, index + 1)"]
    CalcSkip --> ReturnMax["Return max(robCurrent, skipCurrent)"]
    ReturnMax --> End([End])
}`;

    default:
      throw new Error("Unsupported language for mermaid code generation");
  }
};
